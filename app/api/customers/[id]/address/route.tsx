import { faker } from '@faker-js/faker';
import { NextResponse } from 'next/server';

export interface Address {
  streetAddress: string;
  secondaryAddress: string;
  city: string;
  state: string;
  zip: string;
}

export async function GET() {
  let address = [
    {
      streetAddress: faker.location.streetAddress(),
      secondaryAddress: faker.location.secondaryAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zip: faker.location.zipCode(),
    },
  ];

  return NextResponse.json({ address });
}
