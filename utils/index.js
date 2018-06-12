const logger = (msg, tag = '', isError = false) => {
  if (!console) {
    return;
  }

  let fn = 'error';
  let head = 'ERROR';

  if (isError) {
    fn = 'log';
    head = 'LOGGER';
  }
  // eslint-disable-next-line no-console
  console[fn](`[${head}] >>`, tag && `[${tag}] >>`, msg);
};

export default logger;
