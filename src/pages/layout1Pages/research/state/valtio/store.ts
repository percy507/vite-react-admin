import { proxy } from 'valtio';

interface Person {
  name: string;
  age: number;
  birthYear: number;
  hobbies: string[];
  asyncValue: Promise<number>;
}

export const proxyPerson = proxy<Person>({
  name: 'CJ',
  age: 0,
  get birthYear() {
    return new Date().getFullYear() - this.age;
  },
  hobbies: [],
  // Promises may be values in a proxied object. They will be resolved in calls to snapshot.
  // So we probably need to wrapper the component which use async value with `React.Suspense`
  asyncValue: Promise.resolve(0),
});

export const resetHobbies = () => (proxyPerson.hobbies = []);

export const randomAsyncValue = () => {
  proxyPerson.asyncValue = new Promise((r) => {
    setTimeout(() => r(~~(Math.random() * 100000 + 100)), 1000);
  });
};
