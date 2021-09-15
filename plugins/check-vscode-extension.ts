import { execSync } from 'child_process';

// check if current vscode installed specified extensions
export default function checkVscodeExtension(checkedList: string[]): void {
  const installedExtensions = execSync('code --list-extensions', {
    encoding: 'utf8',
  }).split('\n');

  console.log('🧐Checking vscode extensions...');

  if (Array.isArray(checkedList)) {
    for (let i = 0; i < checkedList.length; i++) {
      if (!installedExtensions.includes(checkedList[i])) {
        throw new Error(
          `🌚Detect "${checkedList[i]}" extension is not installed! You must install it before development.`,
        );
      }
    }
  }

  console.log('👍All required vscode extensions has installed.');
}
