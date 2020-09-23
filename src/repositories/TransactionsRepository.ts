import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}
interface CreateTransactionInterface {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const { income, outcome } = this.transactions.reduce(
      (acc, cur) => {
        if (cur.type === 'income') acc.income += cur.value;
        else if (cur.type === 'outcome') acc.outcome += cur.value;
        return acc;
      },
      {
        income: 0,
        outcome: 0,
      },
    );
    return { income, outcome, total: income - outcome };
  }

  public create({
    title,
    type,
    value,
  }: CreateTransactionInterface): Transaction {
    const transaction = new Transaction({ title, type, value });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
