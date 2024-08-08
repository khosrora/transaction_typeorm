import { Body, Controller, Post } from '@nestjs/common';
import { DepositDto } from './dto/wallet.dto';
import { WalletService } from './wallet.service';

@Controller("wallet")
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post('deposit')
  deposit(@Body() depositDto: DepositDto) {
    return this.walletService.deposit_service(depositDto)
  }
}
