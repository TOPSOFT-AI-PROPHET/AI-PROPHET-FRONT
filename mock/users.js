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
          nickname: 'zhang yang',
          balance: '666',
          profile_url: 'http://m.imeitou.com/uploads/allimg/2020031310/tt42dal51ms.jpeg',
          total_tasks: '',
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
  'POST /tasks/list': async (req, res) => {
    if (req.headers.authorization === 'Bearer valid_token') {
      res.send({
        code: 200,
        message: 'Bingo',
        data: [
          {
            model: 'task.task',
            pk: 1,
            fields: {
              user_id: 4,
              ai_id: 1,
              ai_json: 'asd',
              ai_result: 'asd',
              description: 'asd',
              status: 0,
              time_start: '2021-03-10T08:50:36Z',
              time_done: null,
              is_delete: 0,
            },
          },
          {
            model: 'task.task',
            pk: 2,
            fields: {
              user_id: 4,
              ai_id: 1,
              ai_json: 'asd',
              ai_result: 'asd',
              description: 'asd',
              status: 0,
              time_start: '2021-03-10T08:50:36Z',
              time_done: null,
              is_delete: 0,
            },
          },
        ],
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

  'POST /tasks/listAIM': async (req, res) => {
    if (req.headers.authorization === 'Bearer valid_token') {
      res.send({
        code: 200,
        message: 'Bingo',
        data: {
          totalCount: 1,
          numPerPage: 1,
          totalPage: 1,
          pageNum: 1,
          list: [
            {
              model: 'tasks.aimodel1',
              pk: 1,
              fields: {
                ai_name: 1,
                ai_url: 'www.baidu.com',
                ai_status: 1,
                ai_description:
                  'aimodelsaimodelsaimodelsaimodelsaimodelsaimodelsaimodelsaimodelsaimodelsaimodelsaimodelsaimodelsaimodels',
                ai_type: 1,
                ai_credit: 1,
              },
            },
            {
              model: 'tasks.aimodel2',
              pk: 2,
              fields: {
                ai_name: 2,
                ai_url: 'www.baidu.com',
                ai_status: 1,
                ai_description:
                  'aimodelsaimodelsaimodelsaimodelsaimodelsaimodelsaimodelsaimodelsaimodelsaimodelsaimodelsaimodelsaimodels',
                ai_type: 1,
                ai_credit: 1,
              },
            },
            {
              model: 'tasks.aimodel3',
              pk: 3,
              fields: {
                ai_name: 3,
                ai_url: 'www.baidu.com',
                ai_status: 1,
                ai_description:
                  'aimodelsaimodelsaimodelsaimodelsaimodelsaimodelsaimodelsaimodelsaimodelsaimodelsaimodelsaimodelsaimodels',
                ai_type: 1,
                ai_credit: 1,
              },
            },
          ],
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
};
