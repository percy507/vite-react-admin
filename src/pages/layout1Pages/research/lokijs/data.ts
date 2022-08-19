// min and max included
const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// const randomTimestamp = () => {
//   return Date.now() - ~~(Math.random() * 1000 * 3600);
// };

const mockFolders = generateFolders(50);
const mockFiles = generateFiles(100);

export const fakeData = [...mockFolders, ...mockFiles];

function generateFolders(num: number) {
  return new Array(Math.max(1, num))
    .fill(0)
    .map((_, index) => folder(`folder__${index + 1}`));
}

function generateFiles(num: number) {
  let arr: any[] = [];
  mockFolders.forEach((el) => {
    arr.push(
      ...new Array(randomInt(1, Math.max(1, num)))
        .fill(0)
        .map((_, index) => file(`file[${el.id}]__${index + 1}`, el.id)),
    );
  });
  return arr;
}

function folder(id: string) {
  return {
    isFolder: true,
    id,
    parent: 'root',
    title: id,
    content: '',
  };
}

function file(id: string, parent: string) {
  return {
    isFolder: false,
    id,
    parent,
    title: id,
    content: `<h1>${id}</h1><hr/><p>内容内容内容${Math.random()}</p>`,
  };
}
