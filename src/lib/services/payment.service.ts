export class PaymentService {
  static async createTransaction(userId: string, packageId: string, amount: number) {
    return {
      transactionId: `tx-${Date.now()}`,
      userId,
      packageId,
      amount,
      status: "COMPLETED",
      paymentUrl: "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?demo=1",
      createdAt: new Date().toISOString(),
    };
  }
}
