export const parseIp = (ip: string) => {
  if (ip.startsWith('::ffff:')) {
    return ip.slice(7);
  }

  return ip;
};
