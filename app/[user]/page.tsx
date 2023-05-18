import { Suspense } from 'react';
import { Address } from '../api/customers/[id]/address/route';

async function getCar(user: string) {
  const res = await fetch(`http://localhost:3000/api/customers/${user}/car`);

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

async function getAddress(user: string) {
  const res = await fetch(
    `http://localhost:3000/api/customers/${user}/address`
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function PagePage({
  params: { user },
}: {
  params: { user: string };
}) {
  const { cars } = await getCar(user);
  const { address } = await getAddress(user);

  return (
    <main>
      <h1>User: {user}</h1>
      <p>Car</p>
      <pre>{JSON.stringify(cars, null, 2)}</pre>
      <p>Address</p>
      <Suspense fallback={<div>Streaming related loading...</div>}>
        {/* Per: https://nextjs.org/docs/app/building-your-application/data-fetching/fetching#async-and-await-in-server-components */}
        {/* @ts-expect-error Async Server Component */}
        <Address promise={address} />
      </Suspense>
    </main>
  );
}

async function Address({ promise }: { promise: Promise<Address[]> }) {
  // Wait for the address promise to resolve
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const address = await promise;

  return <pre>{JSON.stringify(address, null, 2)}</pre>;
}
