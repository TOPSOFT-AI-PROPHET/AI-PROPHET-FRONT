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
  'POST /users/getUserInfo': async (req, res) => {
    if (req.headers.authorization === 'Bearer valid_token') {
      res.send({
        code: 200,
        message: 'Bingo!',
        data: {
          username: 'f9960ff9-6a85-4458-822b-f777022d8eeb',
          email: 'f9960ff9-6a85-4458-822b-f777022d8eeb@qq.com',
          nickname: '',
        },
      });
      return;
    }

    res.status(401).send({
      detail: 'Given token not valid for any token type',
      code: 'token_not_valid',
      messages: [
        {
          token_class: 'AccessToken',
          token_type: 'access',
          message: 'Token is invalid or expired',
        },
      ],
    });
  },
  'POST /users/register': async (req, res) => {
    if (req.body.username !== 'admin') {
      res.send({
        code: 200,
        message: 'Registered!',
      });
      return;
    }
    res.send({
      code: 403,
      message: 'Mulyiple registration.',
    });
  },
};
