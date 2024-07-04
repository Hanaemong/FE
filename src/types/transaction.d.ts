interface TransactionType {
  memberProfile: string;
  memberName: string;
  memberGender: string;
  amount: number;
  type: string;
  paidDate: Date;
}

interface TeamTransactionType {
  accountNumber: string;
  balance: number;
  teamName: string;
  transactionResList: TransactionType[];
}

interface DueType {
  accountId: number;
  amount: number;
}

interface ExpenseType {
  paidStore: string;
  paidAmount: number;
}
