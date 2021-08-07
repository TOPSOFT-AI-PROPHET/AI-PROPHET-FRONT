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

  'POST /tasks/getAIM': async (req, res) => {
    if (req.headers.authorization === 'Bearer valid_token') {
      res.send({
        code: '200',
        message: 'get success',
        data: {
          total_param: 23,
          details: [
            { name: 'Gender', data_type: 0, ai_description: 'Your gender, 1-Female ; 2-Male' },
            {
              name: 'breakfast',
              data_type: 0,
              ai_description: 'Which sort of brakfast you prefer, 1-cereal option; 2-donut option',
            },
            {
              name: 'Calories_day',
              data_type: 0,
              ai_description:
                '1 - i dont know how many calories i should consume 2 - it is not at all important 3 - it is moderately important 4 - it is very important',
            },
            {
              name: 'Coffee',
              data_type: 0,
              ai_description:
                'Which of the two sorts you associate with the word coffee? 1 - creamy frapuccino 2 - espresso shown',
            },
            {
              name: 'Cook',
              data_type: 0,
              ai_description:
                'How often do you cook? 1 - Every day 2 - A couple of times a week  3 - Whenever I can, but that is not very often   4 - I only help a little during holidays  5 - Never, I really do not know my way around a kitchen',
            },
            {
              name: 'Cuisine',
              data_type: 0,
              ai_description:
                'What type of cuisine did you eat growing up? 1 - Every day 2 - A couple of times a week 3 - Whenever I can, but that is not very often  4 - I only help a little during holidays 5 - Never, I really do not know my way around a kitchen',
            },
            {
              name: 'Drink',
              data_type: 0,
              ai_description:
                'Which sort do you associate with the word “drink”? 1 - orange juice 2 - soda',
            },
            {
              name: 'Eating_out',
              data_type: 0,
              ai_description:
                'Frequency of eating out in a typical week 1 - Never 2 - 1-2 times 3 - 2-3 times 4 - 3-5 times 5 - every day',
            },
            {
              name: 'Employment',
              data_type: 0,
              ai_description: 'Do you work? 1 - yes full time 2 - yes part time 3 – no 4  - other',
            },
            {
              name: 'Exercise',
              data_type: 0,
              ai_description:
                'How often do you exercise in a regular week? 1 - Everyday 2 - Twice or three times per week 3 - Once a week 4 - Sometimes 5 - Never',
            },
            {
              name: 'Fruit_day',
              data_type: 0,
              ai_description:
                'How likely to eat fruit in a regular day 1 - very unlikely 2 - unlikely 3 - neutral 4 - likely 5 - very likely',
            },
            {
              name: 'Greek_food',
              data_type: 0,
              ai_description:
                'How likely to eat greek food when available? 1 - very unlikely 2 - unlikely 3 - neutral 4 - likely 5 - very likely',
            },
            {
              name: 'Healthy_feel',
              data_type: 0,
              ai_description:
                'How likely are you to agree with the following statement:I feel very healthy! ? 1 to 10 where 1 is strongly agree and 10 is strongly disagree - scale',
            },
            {
              name: 'Ideal_diet_coded',
              data_type: 0,
              ai_description:
                '1 – portion control 2 – adding veggies/eating healthier food/adding fruit 3 – balance 4 – less sugar 5 – home cooked/organic 6 – current diet 7 – more protein 8 – unclear',
            },
            {
              name: 'Income',
              data_type: 0,
              ai_description:
                '1 - less than $15,000 2 - $15,001 to $30,000 3 - $30,001 to $50,000 4 - $50,001 to $70,000 5 - $70,001 to $100,000 6 - higher than $100,000',
            },
            {
              name: 'Italian_food',
              data_type: 0,
              ai_description:
                'How likely are you to eat Italian food when available? 1 - very unlikely 2 - unlikely 3 - neutral 4 - likely 5 - very likely',
            },
            {
              name: 'Marital_status',
              data_type: 0,
              ai_description:
                '1 -Single 2 - In a relationship 3 - Cohabiting 4 - Married 5 - Divorced 6 - Widowed',
            },
            {
              name: 'On_off_campus',
              data_type: 0,
              ai_description:
                'Living situation 1 - On campus 2 - Rent out of campus 3 - Live with my parents and commute 4 - Own my own house',
            },
            {
              name: 'Pay_meal_out',
              data_type: 0,
              ai_description:
                'How much would you pay for meal out? 1 - up to $5.00 2 - $5.01 to $10.00 3 - $10.01 to $20.00 4 - $20.01 to $30.00 5 - $30.01 to $40.00 6 - more than $40.01',
            },
            {
              name: 'Self_perception_weight',
              data_type: 0,
              ai_description:
                'Self perception of weight 1 - i dont think myself in these terms 2 - overweight 3 - slightly overweight 4 - just right 5 - very fit 6 - slim',
            },
            {
              name: 'Sports',
              data_type: 0,
              ai_description: 'Do you do any sporting activity? 1 - Yes 2 - No',
            },
            {
              name: 'Veggies_day',
              data_type: 0,
              ai_description:
                'How likely to eat veggies in a day? 1 - very unlikely 2 - unlikely 3 - neutral 4- likely 5 - very likely',
            },
            {
              name: 'Vitamins',
              data_type: 0,
              ai_description: 'Do you take any supplements or vitamins? 1 - yes 2 - no',
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

  'POST /tasks/prediction': async (req, res) => {
    if (req.headers.authorization === 'Bearer valid_token') {
      res.send({
        code: 200,
        message: 'Bingo!',
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
        status: 1,
        message: 'success',
        data: {
          totalCount: 6,
          numPerPage: 5,
          totalPage: 2,
          pageNum: 1,
          list: [
            {
              model: 'tasks.task',
              pk: 1,
              fields: {
                user_id: 1,
                ai_id: 1,
                ai_json: '{\r\n    "test":""\r\n}',
                ai_result: '{\r\n    "test":""\r\n}',
                description: 'asd',
                status: 1,
                time_start: '2021-03-29T11:20:53Z',
                time_done: '2021-03-29T11:28:41Z',
                is_delete: 1,
              },
            },
            {
              model: 'tasks.task',
              pk: 2,
              fields: {
                user_id: 1,
                ai_id: 1,
                ai_json: '{\r\n    "test":""\r\n}',
                ai_result: '{\r\n    "test":""\r\n}',
                description: 'asd',
                status: 1,
                time_start: '2021-03-29T11:20:53Z',
                time_done: '2021-03-29T11:28:41Z',
                is_delete: 1,
              },
            },
            {
              model: 'tasks.task',
              pk: 3,
              fields: {
                user_id: 1,
                ai_id: 1,
                ai_json: '{\r\n    "test":""\r\n}',
                ai_result: '{\r\n    "test":""\r\n}',
                description: 'asd',
                status: 1,
                time_start: '2021-03-29T11:20:53Z',
                time_done: '2021-03-29T11:28:41Z',
                is_delete: 1,
              },
            },
            {
              model: 'tasks.task',
              pk: 4,
              fields: {
                user_id: 1,
                ai_id: 1,
                ai_json: '{\r\n    "test":""\r\n}',
                ai_result: '{\r\n    "test":""\r\n}',
                description: 'asd',
                status: 1,
                time_start: '2021-03-29T11:20:53Z',
                time_done: '2021-03-29T11:28:41Z',
                is_delete: 1,
              },
            },
            {
              model: 'tasks.task',
              pk: 5,
              fields: {
                user_id: 1,
                ai_id: 1,
                ai_json: '{\r\n    "test":""\r\n}',
                ai_result: '{\r\n    "test":""\r\n}',
                description: 'asd',
                status: 1,
                time_start: '2021-03-29T11:20:53Z',
                time_done: '2021-03-29T11:28:41Z',
                is_delete: 1,
              },
            },
            {
              model: 'tasks.task',
              pk: 6,
              fields: {
                user_id: 1,
                ai_id: 1,
                ai_json: '{\r\n    "test":""\r\n}',
                ai_result: '{\r\n    "test":""\r\n}',
                description: 'asd',
                status: 1,
                time_start: '2021-03-29T11:20:53Z',
                time_done: '2021-03-29T11:28:41Z',
                is_delete: 1,
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

  //以下是新增的接口 07.05
  'POST /tasks/numTask': async (req, res) => {
    //统计任务数量
    if (req.headers.authorization === 'Bearer valid_token') {
      res.send({
        status: 200,
        message: {
          num_of_task: 'numoftasknumoftasknumoftasknumoftask',
          num_of_finished_tasks: 'numoffinishedtasksnumoffinishedtasksnumoffinishedtasks',
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
  //以下是新增的接口 07.05
  'POST /tasks/validate': async (req, res) => {
    //统计任务数量
    if (req.headers.authorization === 'Bearer valid_token') {
      res.send({
        code: 200,
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

  'POST /tasks/updateAIauthor': async (req, res) => {
    if (req.headers.authorization === 'Bearer valid_token') {
      res.send({
        code: 200,
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

  'POST /tasks/details': async (req, res) => {
    //返回某任务的详细信息
    if (req.headers.authorization === 'Bearer valid_token') {
      res.send({
        details: {
          task_description: 'aimodelsdetailsaimodelsdetailsaimodelsdetails',
          ai_json: '{\r\n   "test":""\r\n}',
          ai_url: 'aiurlaiurlaiurlaiurl',
          ai_result: 'airesultairesultairesultairesult',
          status: 1,
          time_start: '2021-07-05T17:48:21Z',
          cost: 1,
          ai_params: [{ para_name: 'paranameparaname', para_value: 'paravalue' }],
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

  'POST /tasks/new': async (req, res) => {
    //添加新任务
    if (req.headers.authorization === 'Bearer valid_token') {
      res.send({
        code: '200',
        message: 'bingo',
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

  'POST /tasks/del': async (req, res) => {
    //删除任务列表
    if (req.headers.authorization === 'Bearer valid_token') {
      res.send({
        code: '200',
        message: 'success',
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

  'POST /tasks/train': async (req, res) => {
    //新增AI模型
    if (req.headers.authorization === 'Bearer valid_token') {
      res.send({
        code: 200,
        message: 'success',
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

  'POST /tasks/incAIMusage': async (req, res) => {
    //增加AI模型访问次数
    if (req.headers.authorization === 'Bearer valid_token') {
      res.send({
        code: '200',
        message: 'OK',
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

  'POST /tasks/getAIMusage': async (req, res) => {
    //获取AI模型访问次数
    if (req.headers.authorization === 'Bearer valid_token') {
      res.send({
        code: '200',
        message: 'get success',
        data: 1,
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

  'POST /tasks/modelAuthor': async (req, res) => {
    //返回AI模型作者以及是否公开
    if (req.headers.authorization === 'Bearer valid_token') {
      res.send({
        status: '200',
        message: 'get success',
        author: 'authorauthorauthor',
        publish: false,
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

  'POST /tasks/updatePublished': async (req, res) => {
    //修改AI模型是否公开
    if (req.headers.authorization === 'Bearer valid_token') {
      res.send({
        status: '200',
        message: 'The ai model publish data updated',
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

  'POST /tasks/updatemodelImage': async (req, res) => {
    //修改模型头像
    if (req.headers.authorization === 'Bearer valid_token') {
      res.send({
        status: 'HTTP_200_OK',
        data: {
          code: 200,
          message: 'Bingo',
          Etag: 'ETag',
          uuid: 'uuiduuiduuiduuiduuid',
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

  'POST /tasks/modeldetail': async (req, res) => {
    //返回某模型详情
    if (req.headers.authorization === 'Bearer valid_token') {
      res.send({
        code: 200,
        data: [
          {
            model: 'sdfs',
            fields: {
              ai_name: 'name',
              ai_true_description: 'description', // description of model
              ai_description: '', // model json data
              ai_credit: 15,
              ai_usage: 223,
              user_id: 12, //id of author
              time_start: '123132',
              ai_type: 1,
              // 0-Traditional ML Decision Tree 1-Traditional ML Random Forest
              ai_training_material_count: 10000, //new attribute
              ai_output_unit: 'unit', //new attribute
            },
          },
        ],
      });
      return;
    }
    res.status(404).send({
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

  'POST /tasks/personalAImodel': async (req, res) => {
    //返回某用户AI模型
    if (req.headers.authorization === 'Bearer valid_token') {
      res.send({
        code: 200,
        message: 'get success',
        data: {
          list: [
            {
              model: 'tasks.aimodel',
              pk: 1,
              fields: {
                ai_name: 'lalala',
                ai_url: 'http://m.imeitou.com/uploads/allimg/2020031310/tt42dal51ms.jpeg',
                ai_status: 1,
                ai_description: 'lalalalalala',
                ai_type: 1,
                // 0-Traditional ML Decision Tree 1-Traditional ML Random Forest
                ai_credit: 5,
                ai_true_description: 'aaaaaaaaaaaa',
                ai_author: 'paul',
                ai_published: 1,
                ai_model_profile: '(str)',
                ai_usage: 2,
                ai_training_material_count: 1,
                ai_frozen: 1,
                ai_output_unit: '(str)',
                user_id: 11,
              },
            },
            {
              model: 'tasks.aimodel',
              pk: 2,
              fields: {
                ai_name: 'lalala2',
                ai_url: 'http://m.imeitou.com/uploads/allimg/2020031310/tt42dal51ms.jpeg',
                ai_status: 1,
                ai_description: 'lalalalalala',
                ai_type: 1,
                // 0-Traditional ML Decision Tree 1-Traditional ML Random Forest
                ai_credit: 5,
                ai_true_description: 'aaaaaaaaaaaa',
                ai_author: 'paul',
                ai_published: 1,
                ai_model_profile: '(str)',
                ai_usage: 1,
                ai_training_material_count: 1,
                ai_frozen: 1,
                ai_output_unit: '(str)',
                user_id: 11,
              },
            },
          ],
        },
      });
      return;
    }
    res.status(404).send({
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

  'POST /tasks/modifyAIattri': async (req, res) => {
    //修改AI模型属性
    if (req.headers.authorization === 'Bearer valid_token') {
      res.send({
        code: 200,
        message: 'bingo!',
      });
      return;
    }
    res.code(404).send({
      message: 'failed',
    });
  },

  'GET /pay/personaltrans': async (req, res) => {
    //修改AI模型属性
    if (req.headers.authorization === 'Bearer valid_token') {
      res.send({
        code: 200,
        data: {
          list: [
            {
              model: 'pay.t',
              pk: 2,
              fields: {
                user_id: 2,
                uuid: 'uuid',
                status: 22,
                method: '2323',
                order: 'sdfs',
                credit: 12,
                create_time: 'sds',
                done_time: 'sdf',
              },
            },
            {
              model: 'pay.tsdfsf',
              pk: 3,
              fields: {
                user_id: 2,
                uuid: 'uuid',
                status: 22,
                method: '2323',
                order: 'sdfs',
                credit: 12,
                create_time: 'sds',
                done_time: 'sdf',
              },
            },
          ],
        },
      });
      return;
    }
    res.code(404).send({
      message: 'failed',
    });
  },

  'POST /users/train': async (req, res) => {
    //新建AI训练任务
    if (req.headers.authorization === 'Bearer valid_token') {
      res.send({
        code: 200,
        message: 'Success!',
      });
      return;
    }
    res.code(500).send({
      message: 'failed',
    });
  },

  'POST /tasks/trainingMaterialCount': async (req, res) => {
    //返回并更新AI模型训练数据量
    if (req.headers.authorization === 'Bearer valid_token') {
      res.send({
        code: 200,
        message: 'AImodel updated',
      });
      return;
    }
    res.status(404).send({
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

  'POST /tasks/unlockedModel': async (req, res) => {
    //解锁、恢复已经被强制下架的AI模型
    if (req.headers.authorization === 'Bearer valid_token') {
      res.send({
        code: 200,
        message: 'The AI model is successfully unfrozen',
      });
      return;
    }
    res.status(404).send({
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

  'POST /tasks/updateAIauthor': async (req, res) => {
    //修改AI是否公开
    if (req.headers.authorization === 'Bearer valid_token') {
      res.send({
        code: 200,
        message: 'The AI model publish data cannot changed',
      });
      return;
    }
    res.code(400).send({
      message: 'Invalid request',
    });
  },

  'POST /tasks/updatePublished': async (req, res) => {
    //是否更新AI模型
    if (req.headers.authorization === 'Bearer valid_token') {
      res.send({
        code: 200,
        message: 'The AI model publish data update',
      });
      return;
    }
    res.code(400).send({
      message: 'Invalid request',
    });
  },

  'POST /users/updateUserProfile': async (req, res) => {
    //更新用户信息
    if (req.headers.authorization === 'Bearer valid_token') {
      res.send({
        status: 'HTTP_200_OK',
        data: {
          code: 200,
          message: 'UserinfoUpdated',
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

  'POST /users/getUserInfo': async (req, res) => {
    //获取用户信息
    if (req.headers.authorization === 'Bearer valid_token') {
      res.send({
        code: 200,
        messages: 'Bingo',
        data: {
          username: 'usernameusernameusername',
          email: 'emailemailemailemailemail',
          nickname: 'nicknamenicknamenicknamenickname',
          credit: 1,
          contact_number: 1,
          profile_image_url: 'http://m.imeitou.com/uploads/allimg/2020031310/tt42dal51ms.jpeg',
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

  'POST /users/changePasswd': async (req, res) => {
    //修改密码
    if (req.headers.authorization === 'Bearer valid_token') {
      res.send({
        status: 'HTTP_200_OK',
        data: {
          code: 200,
          message: 'User password is changed',
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

  'POST /users/returnUsrID': async (req, res) => {
    //返回用户user_id
    if (req.headers.authorization === 'Bearer valid_token') {
      res.send({
        status: 'HTTP_200_OK',
        data: {
          code: 200,
          user_id: 12,
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

  'GET /tasks/personalAImodelUsage': async (req, res) => {
    //返回某用户AI模型使用次数
    if (req.headers.authorization === 'Bearer valid_token') {
      res.send({
        status: 200,
        message: 'get success',
        ai_model_usage: { ai_model_usage: 22 },
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

  'POST /users/uploadProfile': async (req, res) => {
    //上传头像
    if (req.headers.authorization === 'Bearer valid_token') {
      res.send({
        status: 'HTTP_200_OK',
        data: {
          code: 200,
          message: 'Profile image is changed',
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

  'POST /files/updateUserProfileImage': async (req, res) => {
    //修改用户头像
    if (req.headers.authorization === 'Bearer valid_token') {
      res.send({
        status: 'HTTP_200_OK',
        data: {
          code: 200,
          Etag: 'Etag',
          message: 'uuiduuiduuid',
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

  'POST /files/uploadFile_cos': async (req, res) => {
    //上传预测文件
    if (req.headers.authorization === 'Bearer valid_token') {
      res.send({
        status: 'HTTP_200_OK',
        data: {
          code: 200,
          message: 'Bingo',
          Etag: 'Etag',
          message: 'uuiduuiduuid',
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

  'POST /pay/charge': async (req, res) => {
    //充值
    if (req.headers.authorization === 'Bearer valid_token') {
      res.send({
        code: 200,
        message: 'Success!',
        operation: '+amount',
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

  'POST /pay/deduct': async (req, res) => {
    //扣费
    if (req.headers.authorization === 'Bearer valid_token') {
      res.send({
        code: 200,
        message: 'Success!',
        operation: '-amount',
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
