import { faker } from '@faker-js/faker';
import { NextResponse } from 'next/server';
import type { SexType } from '@faker-js/faker';

type SubscriptionTier = 'free' | 'basic' | 'business';

export interface User {
  _id: string;
  avatar: string;
  birthday: Date;
  email: string;
  firstName: string;
  lastName: string;
  sex: SexType;
  subscriptionTier: SubscriptionTier;
}

function createRandomUser(): User {
  const sex = faker.person.sexType();
  const firstName = faker.person.firstName(sex);
  const lastName = faker.person.lastName();
  const email = faker.internet.email({ firstName, lastName });

  return {
    _id: faker.string.uuid(),
    avatar: faker.image.avatar(),
    birthday: faker.date.birthdate(),
    email,
    firstName,
    lastName,
    sex,
    subscriptionTier: faker.helpers.arrayElement(['free', 'basic', 'business']),
  };
}

export async function GET() {
  faker.seed(123);
  let customers = [];
  for (let i = 0; i < 5; i++) {
    customers.push(createRandomUser());
  }

  return NextResponse.json({ customers });
}
