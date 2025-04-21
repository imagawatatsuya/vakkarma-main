// hash_password.mjs
import bcrypt from 'bcrypt-ts';

// ★★★ ここに手順1で決めた新しいパスワードを入力 ★★★
const newPassword = 'newSecretPassword123';
const saltRounds = 10; // ハッシュ化のコスト（通常10でOK）

async function generateHash() {
  try {
    const hash = await bcrypt.hash(newPassword, saltRounds);
    console.log('新しいパスワードのハッシュ値:', hash);
    console.log('↑ この値をコピーして SQL 文で使用してください。');
  } catch (err) {
    console.error('パスワードのハッシュ化中にエラーが発生しました:', err);
  }
}

generateHash();