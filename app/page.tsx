import Link from 'next/link';
import { User } from './api/customers/route';

async function getData() {
  const res = await fetch('http://localhost:3000/api/customers');

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Home() {
  const { customers } = await getData();

  return (
    <main>
      <h1>Faker Test</h1>
      {customers.map((customer: User) => (
        <div className="py-2" key={customer._id}>
          <Link
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            href={customer._id}
          >
            Single User Page
          </Link>
          <p>
            Name: {customer.firstName} {customer.lastName}
          </p>
          <p>Email: {customer.email}</p>
          <p>Subscription Tier: {customer.subscriptionTier}</p>
        </div>
      ))}
    </main>
  );
}
