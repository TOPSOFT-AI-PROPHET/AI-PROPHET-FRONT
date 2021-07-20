import { UploadOutlined, LoadingOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Input, Upload, Form, Space, Checkbox, Select, message, Modal, Empty } from 'antd';
import { FormattedMessage, formatMessage, history } from 'umi';
import React, { Component } from 'react';
import styles from './EditorView.less';
import defaultSettings from '../../../../../config/defaultSettings';
import 'antd/es/modal/style';
import 'antd/es/slider/style';
import request from '@/utils/request';
import Cropper from 'react-easy-crop';
import { Slider } from 'antd';
// import Cropper from 'react-easy-crop'

export default class EditorView extends Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      loading: false,
      modalVisible: false,
      imgSrc: '',
      zoom: 1,
      crop: { x: 0, y: 0 },
      Rotation: 0,
      croppedImage: undefined,
      croppedAreaPixels: undefined,
    };
  }

  componentDidMount() {
    let back = false;
    request('/tasks/modelAuthor', {
      method: 'POST',
      data: {
        ai_id: this.props.match.params.id,
      },
    }).then((result) => {
      back = result.publish;
      console.log(back);
    });

    request('/tasks/modeldetail', {
      method: 'POST',
      data: {
        ai_id: this.props.match.params.id,
      },
    }).then((result) => {
      this.setState({
        data: result.data,
        stack: back,
      });
      this.formRef.current.setFieldsValue({ stack: back });
    });
  }

  saveCroppedImg = () => {
    // const croppedImg = this.getCroppedImg(this.state.imageSrc, this.state.croppedAreaPixels, this.state.Rotation)
    // console.log('done',{croppedImg})
  };

  getCroppedImg = async (imageSrc, pixelCrop, rotation = 0) => {
    function getRadianAngle(degreeValue) {
      return (degreeValue * Math.PI) / 180;
    }
    const createImage = (url) =>
      new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', () => resolve(image));
        image.addEventListener('error', (error) => reject(error));
        image.setAttribute('crossOrigin', 'anonymous'); // needed to avoid cross-origin issues on CodeSandbox
        image.src = url;
      });
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const maxSize = Math.max(image.width, image.height);
    const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));
    canvas.width = safeArea;
    canvas.height = safeArea;
    ctx.translate(safeArea / 2, safeArea / 2);
    ctx.rotate(getRadianAngle(rotation));
    ctx.translate(-safeArea / 2, -safeArea / 2);
    // draw rotated image and store data.
    ctx.drawImage(image, safeArea / 2 - image.width * 0.5, safeArea / 2 - image.height * 0.5);
    const data = ctx.getImageData(0, 0, safeArea, safeArea);

    // set canvas width to final desired crop size - this will clear existing context
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.putImageData(
      data,
      Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
      Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y),
    );

    return canvas.toBlob((file) => {
      console.log(file);
    }, 'image/jpeg');
  };

  onCropComplete = (croppedAreaPixels) => {
    this.setState({
      croppedAreaPixels,
    });
  };

  handleAvaterChange = (e) => {
    console.log(e.fileList);
  };

  onRotationChange = (Rotation) => {
    this.setState({
      Rotation,
    });
  };

  onZoomChange = (zoom) => {
    this.setState({ zoom });
  };

  onCropChange = (crop) => {
    this.setState({ crop });
  };

  setModalVisible = (boolean) => {
    this.setState({
      modalVisible: boolean,
    });
  };

  beforeUpload = (file) => {
    console.log(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    console.log(reader);
    reader.onload = (e) => {
      this.setState({
        imgSrc: e.target.result,
        modalVisible: true,
      });
    };
    return false;
  };

  checkBoxOnChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
    if (e) {
      this.formRef.current.setFieldsValue({ stack: e.target.checked });
      console.log(this.formRef.current.getFieldValue());
    }
  };

  handleSubmit = async (id) => {
    console.log(id);
    const checkboxChoice = () => {
      if (this.formRef.current.getFieldValue('stack')) {
        return 1;
      }
      return 0;
    };
    try {
      const values = await this.formRef.current.validateFields();
      console.log('Success:', values);
      request('/tasks/updateAIauthor', {
        method: 'post',
        data: {
          ai_id: this.props.match.params.id,
          publish: checkboxChoice(),
        },
      }).then((result) => {
        if (result.code === 200) {
          message.success('success');
        } else {
          message.warn('提交失败');
        }
      });
      request('/tasks/modifyAlattri', {
        method: 'POST',
        data: {
          ai_id: this.props.match.params.id,
          ai_name: this.formRef.current.getFieldValue('modelname'),
          model_intro: this.formRef.current.getFieldValue('model_intro'), // description of model
          model_price: Number(this.formRef.current.getFieldValue('model_price')),
          model_type: this.formRef.current.getFieldValue('algorithm_type'),
          is_published: checkboxChoice(), // 1-Y 0-N
        },
      });
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
      message.warn('提交校验失败');
    }
  };

  render() {
    const { Option } = Select;
    const { confirm } = Modal;

    if (this.state.data) {
      return (
        <div className={styles.baseView} ref={this.getViewDom}>
          <div className={styles.left}>
            <Form
              ref={this.formRef}
              layout="vertical"
              hideRequiredMark
              initialValues={this.state.data}
            >
              <Form.Item
                name="modelname"
                label={formatMessage({
                  id: 'accountandsettings.basic.modelname',
                })}
                rules={[
                  {
                    required: true,
                    message: formatMessage(
                      {
                        id: 'accountandsettings.basic.modelname-message',
                      },
                      {},
                    ),
                  },
                ]}
              >
                <Input
                  maxLength={18}
                  placeholder={formatMessage({
                    id: 'accountandsettings.basic.modelname-placeHolder',
                  })}
                  onChange={(e) => {
                    if (e) {
                      this.formRef.current.setFieldsValue({ modelname: e.target.value });
                    }
                  }}
                />
              </Form.Item>
              <Form.Item
                name="model_price"
                label={formatMessage({
                  id: 'accountandsettings.basic.modelprice',
                })}
                rules={[
                  {
                    required: true,
                    message: formatMessage(
                      {
                        id: 'accountandsettings.basic.modelprice-message',
                      },
                      {},
                    ),
                  },
                  {
                    pattern: /^[1-9][0-9]*$/,
                    message: 'it should be a whole number',
                  },
                ]}
              >
                <Input
                  type="number"
                  placeholder={formatMessage({
                    id: 'accountandsettings.basic.modelprice-placeHolder',
                  })}
                  onChange={(e) => {
                    if (e) {
                      console.log(e.target);
                      console.log(this.formRef.current.getFieldValue());
                      this.formRef.current.setFieldsValue({ model_price: e.target.value });
                    }
                  }}
                />
              </Form.Item>
              <Form.Item
                name="model_intro"
                label={formatMessage({
                  id: 'accountandsettings.basic.modelinfo',
                })}
                rules={[
                  {
                    required: true,
                    message: formatMessage(
                      {
                        id: 'accountandsettings.basic.modelinfo-message',
                      },
                      {},
                    ),
                  },
                ]}
              >
                <Input.TextArea
                  showCount
                  maxLength={50}
                  placeholder={formatMessage({
                    id: 'accountandsettings.basic.modelinfo-placeHolder',
                  })}
                  rows={4}
                  onChange={(e) => {
                    if (e) {
                      this.formRef.current.setFieldsValue({ model_intro: e.target.value });
                    }
                  }}
                />
              </Form.Item>
              <Form.Item
                name="algorithm_type"
                onChange={(e) => {
                  if (e) {
                    this.formRef.current.setFieldsValue({ algorithm_type: e.target.value });
                  }
                }}
                label={formatMessage({
                  id: 'accountandsettings.basic.modeltype',
                })}
                rules={[
                  {
                    required: true,
                    message: formatMessage(
                      {
                        id: 'accountandsettings.basic.modeltype-message',
                      },
                      {},
                    ),
                  },
                ]}
              >
                <Select>
                  <Option value={1}>
                    {formatMessage({ id: 'accountandsettings.basic.modeltype-selectOption1' })}
                  </Option>
                  <Option value={2}>
                    {formatMessage({ id: 'accountandsettings.basic.modeltype-selectOption2' })}
                  </Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="stack"
                label={formatMessage({
                  id: 'accountandsettings.basic.stack',
                })}
              >
                <Checkbox
                  defaultChecked={this.state.stack}
                  onChange={this.checkBoxOnChange}
                ></Checkbox>
              </Form.Item>
              <br />
              <Form.Item>
                <Space size="middle">
                  <Button
                    style={{ width: 68 }}
                    type="primary"
                    onClick={() => {
                      confirm({
                        style: { top: '30%' },
                        title: '你确定要保存么？',
                        icon: <ExclamationCircleOutlined />,
                        content: '点击确定将上传表单',
                        onOk: this.handleSubmit,
                        onCancel() {},
                      });
                    }}
                  >
                    <FormattedMessage
                      id="accountandsettings.basic.save"
                      // defaultMessage="Update Information"
                    />
                  </Button>
                  <Button
                    style={{ width: 68 }}
                    onClick={() => {
                      confirm({
                        style: { top: '30%' },
                        title: '你确定要返回么？',
                        icon: <ExclamationCircleOutlined />,
                        content: '点击确定返回模型列表',
                        onOk() {
                          history.push('/dash/model/model');
                        },
                        onCancel() {},
                      });
                    }}
                  >
                    <FormattedMessage
                      id="accountandsettings.basic.back"
                      // defaultMessage="Update Information"
                    />
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </div>

          <div className={styles.right}>
            <>
              <div className={styles.avatar_title}>
                <FormattedMessage
                  id="accountandsettings.basic.modelAvatar"
                  defaultMessage="Avatar"
                />
              </div>
              <div className={styles.avatar}>
                <img src={this.state.imageURL} alt="cover" />
              </div>

              <>
                <Upload
                  maxCount={1}
                  showUploadList={false}
                  name="avatar"
                  className="avatar-uploader"
                  beforeUpload={this.beforeUpload}
                  onChange={this.handleAvaterChange}
                  action={
                    process.env.NODE_ENV !== 'development'
                      ? `${defaultSettings.backURL}/users/updateUserProfileImage`
                      : `/users/updateUserProfileImage`
                  }
                  method="POST"
                  headers={{
                    authorization: `Bearer ${this.state.code}`,
                  }}
                >
                  <div className={styles.button_view}>
                    <Button
                      onClick={() => {
                        this.setState({
                          loading: true,
                        });
                      }}
                    >
                      {this.state.loading ? <LoadingOutlined /> : <UploadOutlined />}{' '}
                      <FormattedMessage
                        id="accountandsettings.basic.change-cover"
                        defaultMessage="Change cover"
                      />
                    </Button>
                  </div>
                </Upload>
              </>
              <Modal
                bodyStyle={{ height: 600, width: 600 }}
                width={600}
                title="Cropper"
                visible={this.state.modalVisible}
                onCancel={() => {
                  this.setModalVisible(false);
                }}
                onOk={() => {
                  // console.log(this.cropper);
                  this.saveCroppedImg();
                  request('/tasks/updatemodelImage', {
                    method: 'post',
                    data: {
                      modelprofile: '',
                      ai_id: this.props.match.params.id,
                    },
                  });
                  this.setState({
                    modalVisible: false,
                  });
                }}
              >
                <div style={{ position: 'relative', width: '100%', height: '85%' }}>
                  <Cropper
                    ref={(cropper) => {
                      this.cropper = cropper;
                    }}
                    zoom={this.state.zoom}
                    crop={this.state.crop}
                    image={this.state.imgSrc}
                    onCropChange={this.onCropChange}
                    onZoomChange={this.onZoomChange}
                    cropSize={{ width: 225, height: 400 }}
                    rotation={this.state.Rotation}
                    onRotationChange={this.onRotationChange}
                    onCropComplete={this.onCropComplete}
                  />
                </div>

                <strong>Zoom</strong>
                <Slider
                  min={1}
                  max={3}
                  step={0.1}
                  onChange={this.onZoomChange}
                  value={this.state.zoom}
                />
                <strong>Rotation</strong>
                <Slider
                  value={this.state.Rotation}
                  min={0}
                  max={360}
                  step={1}
                  onChange={this.onRotationChange}
                />
              </Modal>
            </>
          </div>
        </div>
      );
    }
    return <Empty />;
  }
}
