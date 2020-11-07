export function avatarText(name) {
  return name
    .split(' ')
    .map((part) => part.charAt(0))
    .join('');
}
