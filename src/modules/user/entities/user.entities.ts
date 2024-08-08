import { WalletEntity } from 'src/modules/wallet/entities/wallet.entities';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  fullname: string;

  @Column()
  mobile: string;

  @Column({ type: 'numeric', default: 0 })
  balance: number;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => WalletEntity, (wallet) => wallet.user)
  transactions: WalletEntity[];
}
