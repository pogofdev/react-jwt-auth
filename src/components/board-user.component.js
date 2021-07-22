import React, {Component} from "react";
import UserService from "../services/user.service";
import {
    Button,
    Form,
    Input,
    InputNumber,
    Modal,
    notification,
    PageHeader,
    Row,
    Select,
    Statistic,
    Table,
    Tag
} from 'antd';
import {ExclamationCircleOutlined} from '@ant-design/icons';
import {currencyParser, format_Number_int, formatMoney, numberFormater, pointFormatter} from "../Utils";
import  * as moment from 'moment'
const { Option } = Select;


export default class BoardUser extends Component {

    constructor(props) {
        super(props);

        this.state = {
            content: "",
            modal1Visible: false,
            modal2Visible: false,
            modal3Visible: false,
            newAmount: 0,
            recipient:'',
            totalSupply: 0,
            ticketType: undefined,
            ticketQuantity:0,
            transactions:[],
            balance: 0
        };
        this.myRef = React.createRef();
        this.myRef1 = React.createRef();
        this.columns = [
            {

                title: 'From',
                dataIndex: 'from',
                render: from => {
                    return <div style={{textAlign:"left"}}>{from}</div>
                },
            },
            {
                title: 'To',
                dataIndex: 'to',
                render: to => {
                    return <div style={{textAlign:"left"}}>{to}</div>
                },
            },
            {
                title: 'Amount',
                dataIndex: 'amount',
                render: amount => {
                    return <div style={{textAlign:"right"}}>{format_Number_int(amount)}</div>
                },
            },
            {
                title: 'Trans Type',
                dataIndex: 'transType',
                render: transType => {
                    return <div style={{textAlign:"right"}}>{(transType)}</div>
                },
            },
            {
                title: 'Balance after transaction',
                dataIndex: 'balance',
                render: balance => {
                    return <div style={{textAlign:"right"}}>{format_Number_int(balance)}</div>
                },
            },
            {
                title: 'Transfer date',
                dataIndex: 'timeStamp',
                render: timeStamp => {
                    return <div style={{textAlign:"right"}}>{ moment(parseInt(timeStamp)).format("DD/MM/YYYY HH:mm:ss")}</div>
                },
            },
        ];
    }

    async componentDidMount() {
        UserService.getUserBoard().then(
            response => {

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
        await this.loadTrans()


        /*UserService.getUserTransactions().then(
            response => {
                console.log(`====>`, response)
                /!* this.setState({
                     ...response.data,
                 });*!/
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
        );*/
    }
    loadTrans = async () => {
        let transactions = await UserService.getUserTransactions(this.state.recipient, this.state.newAmount)
        // console.log(`====>`, transactions)
        this.setState({
            transactions: transactions.data
        })
    }


    setModal1Visible(modal1Visible) {
        this.setState({modal1Visible});
    }

    setModal2Visible(modal2Visible) {
        this.setState({modal2Visible});
    }
    setModal3Visible(modal3Visible) {
        this.setState({modal3Visible});
    }


    onChange = (newAmount) => {
        this.setState({newAmount});
    }

    onChangeQuantity = (ticketQuantity) => {
        console.log(ticketQuantity)
        this.setState({ticketQuantity});
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
                },async () => await this.loadTrans());
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
                    },async () => await this.loadTrans());
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


    handleOkBuyTicket = async () => {

            try {
                await this.myRef.current.validateFields()
                let result = await UserService.buyTicket(this.state.ticketType,this.state.ticketQuantity)
                console.log(`===>`,result)
                if (result.data && result.data.length>=0) {
                    // console.log('result.data.data', result.data.data)
                    this.setState({
                        // balance:result.data.data.fromUpdatedBalance,
                        // ...result.data.data,
                        modal3Visible: false
                    },async () => await this.loadTrans());
                } else {
                    this.setState({
                        modal3Visible: false
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

    confirmBuyTickets = () => {
        Modal.confirm({
            title: 'Confirm',
            icon: <ExclamationCircleOutlined/>,
            content: 'Are you sure?',
            okText: 'OK',
            cancelText: 'Cancel',
            onOk: this.handleOkBuyTicket
        });
    }

    anyValidation = (rule, value, callback)=>{
        if (value <=0) {
            callback('Please enter value greater than 0');
        } else {
            callback();
        }
    }

    onChangeTicket=(ticketType)=> {
        this.setState({ticketType})
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
                        <Button key="3" onClick={() => this.setModal3Visible(true)}>{`Buy Item`}</Button>,
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
                    <Row>
                        <div style={{marginTop:20,fontWeight:'bold',fontSize:15}}>Transactions:</div>
                        <Table style={{width:'100%',marginTop:10}} columns={this.columns} dataSource={this.state.transactions}  />
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



                <Modal
                    title={`Buy tickets`}
                    style={{top: '20%'}}
                    visible={this.state.modal3Visible}
                    onOk={this.confirmBuyTickets}
                    onCancel={() => this.setModal3Visible(false)}
                >
                    <Form
                        // labelCol={{span: 4}}
                        // wrapperCol={{span: 14, offset: 0}}
                        layout={'vertical'}
                        ref={this.myRef}
                    >
                        <Form.Item label="Ticket"
                                   name="Ticket"
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Please a ticket to buy!',
                                       }]}
                        >
                            <Select
                                showSearch
                                style={{ width: `100%` }}
                                placeholder="Select a ticket to buy"
                                optionFilterProp="children"
                                onChange={this.onChangeTicket}
                                // onFocus={onFocus}
                                // onBlur={onBlur}
                                // onSearch={onSearch}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                <Option value="OI93EX">Castrol GTX [SL 20W-50] 4L - 465 ₫</Option>
                                <Option value="ZMGPBJ">Mobil Super 2000 [SP 10W-40] 4L - 900 ₫</Option>
                                <Option value="QW5ZGQ">Mobil Super Motor Synthetic [SL 10W-40, MA2] 0.8L - 140 ₫</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Quantity" name="quantity"
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Please enter quantity',
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

                                defaultValue={this.state.ticketQuantity}
                                // defaultValue={1}
                                style={{width: `50%`}}
                                step={1}
                                formatter={numberFormater}
                                parser={currencyParser}
                                onChange={this.onChangeQuantity}
                            />
                        </Form.Item>

                    </Form>
                </Modal>
            </div>
        );
    }
}
