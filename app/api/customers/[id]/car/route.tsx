import { faker } from '@faker-js/faker';
import { NextResponse } from 'next/server';

export async function GET() {
  let cars = [
    {
      model: faker.vehicle.model(),
      manufacturer: faker.vehicle.manufacturer(),
    },
  ];

  return NextResponse.json({ cars });
}
