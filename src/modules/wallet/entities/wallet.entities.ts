import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { walletType } from '../wallet.enum';
import { UserEntity } from 'src/modules/user/entities/user.entities';

@Entity('wallet')
export class WalletEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'enum', enum: walletType })
  type: string;

  @Column()
  invoice_number: string;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.transactions, {
    onDelete: 'SET NULL',
  })
  user: UserEntity;
}
