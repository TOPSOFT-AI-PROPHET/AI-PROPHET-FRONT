// eslint-disable-next-line import/no-extraneous-dependencies
export default {
  'POST  /api/resetpasswd': (_, res) => {
    res.send({
      status: 'ok',
      currentAuthority: 'user',
    });
  },
};
