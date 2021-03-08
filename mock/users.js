export default {
  'POST /users/login': async (req, res) => {
    const { username, password } = req.body;
    if (password === 'admin' && username === 'admin') {
      res.send({
        refresh: 'valid_token',
        access: 'valid_token',
      });
      return;
    }

    res.status(401).send({
      detail: 'No active account found with the given credentials',
    });
  },
  'POST /users/refresh': async (req, res) => {
    const { refresh } = req.body;
    if (refresh === 'valid_token') {
      res.send({
        access: 'valid_token',
      });
      return;
    }

    res.status(401).send({
      detail: 'Token is invalid or expired',
      code: 'token_not_valid',
    });
  },
};
