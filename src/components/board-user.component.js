import React, {Component} from "react";
import UserService from "../services/user.service";
import {Button, Form, Input, InputNumber, Modal, notification, PageHeader, Row, Statistic, Tag} from 'antd';
import {ExclamationCircleOutlined} from '@ant-design/icons';
import {currencyParser, pointFormatter} from "../Utils";


export default class BoardUser extends Component {

    constructor(props) {
        super(props);

        this.state = {
            content: "",
            modal1Visible: false,
            modal2Visible: false,
            newAmount: 0,
            recipient:'',
            totalSupply: 0,
            balance: 0
        };
        this.myRef = React.createRef();
        this.myRef1 = React.createRef();
    }

    componentDidMount() {
        UserService.getUserBoard().then(
            response => {
                console.log(`====>`, response)
                this.setState({
                    ...response.data,
                });
            },
            error => {
                this.setState({
                    content:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                });
            }
        );
    }


    setModal1Visible(modal1Visible) {
        this.setState({modal1Visible});
    }

    setModal2Visible(modal2Visible) {
        this.setState({modal2Visible});
    }

    onChange = (newAmount) => {
        console.log(newAmount)
        this.setState({newAmount});
    }

    onRecipientChange = (recipient) => {
        this.setState({recipient:recipient.target.value});
    }

    handleOk = async () => {
        try {
            console.log('===>',await this.myRef1.current.validateFields())
            let result = await UserService.createNewTokens(this.state.newAmount)

            if (result.data.success) {
                console.log('result.data.data', result.data.data)
                this.setState({
                    ...result.data.data,
                    modal1Visible: false
                });
            } else {
                this.setState({
                    modal1Visible: false
                });
            }

            console.log('result.data', result.data)
        } catch (e) {

        }
    }

    handleOkTransfer = async () => {

            try {
                console.log('===>',await this.myRef.current.validateFields())
                let result = await UserService.transferTokens(this.state.recipient,this.state.newAmount)

                if (result.data.success) {
                    console.log('result.data.data', result.data.data)
                    this.setState({
                        balance:result.data.data.fromUpdatedBalance,
                        // ...result.data.data,
                        modal2Visible: false
                    });
                } else {
                    this.setState({
                        modal2Visible: false
                    },()=>notification.error({
                        message: 'Error',
                        description:
                            result.data.error,
                        onClick: () => {
                            console.log('Notification Clicked!');
                        },
                    }));
                }

                console.log('result.data', result.data)
            } catch (e) {

            }



    }

    confirm = () => {
        Modal.confirm({
            title: 'Confirm',
            icon: <ExclamationCircleOutlined/>,
            content: 'Are you sure?',
            okText: 'OK',
            cancelText: 'Cancel',
            onOk: this.handleOk
        });
    }
    confirmTransfer = () => {
        Modal.confirm({
            title: 'Confirm',
            icon: <ExclamationCircleOutlined/>,
            content: 'Are you sure?',
            okText: 'OK',
            cancelText: 'Cancel',
            onOk: this.handleOkTransfer
        });
    }

    anyValidation = (rule, value, callback)=>{
        if (value <=0) {
            callback('Please enter value greater than 0');
        } else {
            callback();
        }
    }

    render() {
        return (
            <div className="container">
                <PageHeader
                    onBack={() => window.history.back()}
                    title={this.state.username}
                    tags={<Tag color="blue">Running</Tag>}
                    subTitle={`${this.state.roles}`}
                    extra={[
                        <Button key="3">{`Buy Item`}</Button>,
                        <Button key="2"  onClick={() => this.setModal2Visible(true)}>{`Transfer`}</Button>,
                        this.state.roles && this.state.roles.length > 0 && this.state.roles[0] === 'INTEGRATE' &&
                        <Button key="1" type="primary" onClick={() => this.setModal1Visible(true)}>
                            {`Create new ₫`}
                        </Button>,

                    ]}
                >
                    <Row>
                        {this.state.roles && this.state.roles.length > 0 && this.state.roles[0] === 'INTEGRATE' &&
                        <Statistic title="Total Supply" suffix={'₫'} value={this.state.totalSupply}/>}
                        <Statistic
                            title="Owned Items"
                            prefix=""
                            value={this.state.ownedItems}
                            style={{
                                margin: '0 32px',
                            }}
                        />
                        <Statistic title="Balance" suffix={'₫'} ix="d" value={this.state.balance}/>
                    </Row>
                </PageHeader>

                <Modal
                    title={`Create new ₫`}
                    style={{top: '20%'}}
                    visible={this.state.modal1Visible}
                    onOk={this.confirm}
                    onCancel={() => this.setModal1Visible(false)}
                >
                    <Form
                        // labelCol={{span: 4}}
                        wrapperCol={{span: 14, offset: 0}}
                        layout={'vertical'}
                        ref={this.myRef1}

                    >
                        <Form.Item label="Number of ₫ to create" name="layout"
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Please enter amount',
                                       },
                                       {
                                           validator: async (_, names) => {
                                               if (!names || parseInt(names) <= 0) {
                                                   return Promise.reject(new Error('Please enter value greater than 0'));
                                               }
                                           },
                                       },
                                   ]}
                        >
                            <InputNumber
                                value={this.state.newAmount}
                                // defaultValue={1000000}
                                style={{width: `100%`}}
                                step={10000}
                                formatter={pointFormatter}
                                parser={currencyParser}
                                onChange={this.onChange}
                            />
                        </Form.Item>
                    </Form>
                </Modal>

                <Modal
                    title={`Transfer ₫ to user`}
                    style={{top: '20%'}}
                    visible={this.state.modal2Visible}
                    onOk={this.confirmTransfer}
                    onCancel={() => this.setModal2Visible(false)}
                >
                    <Form
                        // labelCol={{span: 4}}
                        wrapperCol={{span: 14, offset: 0}}
                        layout={'vertical'}
                        ref={this.myRef}
                    >
                        <Form.Item label="Recipient"
                                   name="Recipient"
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Please input your Recipient!',
                                       }]}
                        >
                            <Input placeholder="Please enter username to send" onChange={this.onRecipientChange}/>
                        </Form.Item>
                        <Form.Item label="Number of ₫ to transfer" name="amount"
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Please enter amount',
                                       },
                                       {
                                           validator: async (_, names) => {
                                               if (!names || parseInt(names) <= 0) {
                                                   return Promise.reject(new Error('Please enter value greater than 0'));
                                               }
                                           },
                                       },
                                   ]}
                        >
                            <InputNumber
                                value={this.state.newAmount}
                                // defaultValue={1000000}
                                style={{width: `100%`}}
                                step={10000}
                                formatter={pointFormatter}
                                parser={currencyParser}
                                onChange={this.onChange}
                            />
                        </Form.Item>

                    </Form>
                </Modal>
            </div>
        );
    }
}
