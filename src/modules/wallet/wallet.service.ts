import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { WalletEntity } from './entities/wallet.entities';
import { DepositDto } from './dto/wallet.dto';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/entities/user.entities';
import { walletType } from './wallet.enum';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(WalletEntity)
    private walletRepository: Repository<WalletEntity>,
    private userService: UserService,
    private dataSource: DataSource,
  ) {}

  async deposit_service(depositDto: DepositDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.startTransaction();
    await queryRunner.connect();
    try {
      const { fullname, amount, mobile } = depositDto;

      const user = await this.userService.createUser_service({
        mobile,
        fullname,
      });
      //   ! isolation :
      const userData = await queryRunner.manager.findOneBy(UserEntity, {
        id: user.id,
      });
      const newBalance = Number(userData.balance) + Number(amount);
      console.log(newBalance);
      await queryRunner.manager.update(
        UserEntity,
        { id: userData.id },
        { balance: newBalance },
      );
      await queryRunner.manager.insert(WalletEntity, {
        amount,
        type: walletType.Deposit,
        invoice_number: Date.now().toString(),
        userId: userData.id,
      });

      // ! commit
      await queryRunner.commitTransaction();
      await queryRunner.release();
    } catch (error) {
      // rollback
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      console.log(error);
    }
    return {
      message: 'payment successfully',
    };
  }
}
