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
    Tabs,
    Tag
} from 'antd';
import {ExclamationCircleOutlined} from '@ant-design/icons';
import {currencyParser, format_Number_int, numberFormater, pointFormatter} from "../Utils";
import * as moment from 'moment'

const {Option} = Select;
const {TabPane} = Tabs;


const TICKETS = {
    OI93EX: "Castrol GTX [SL 20W-50] 4L",
    ZMGPBJ: "Mobil Super 2000 [SP 10W-40] 4L",
    QW5ZGQ: "Mobil Super Motor Synthetic [SL 10W-40, MA2] 0.8L",

}

export default class BoardUser extends Component {

    constructor(props) {
        super(props);

        this.state = {
            content: "",
            modal1Visible: false,
            modal2Visible: false,
            modal3Visible: false,
            newAmount: 0,
            recipient: '',
            totalSupply: 0,
            ticketType: undefined,
            ticketQuantity: 0,
            transactions: [],
            tickets: [],
            redeemTickets: [],
            selectedRowKeys: [],
            ownedItems: 0,
            balance: 0
        };
        this.myRef = React.createRef();
        this.myRef1 = React.createRef();
        this.columns = [
            {

                title: 'From',
                dataIndex: 'from',
                render: from => {
                    return <div style={{textAlign: "left"}}>{from}</div>
                },
            },
            {
                title: 'To',
                dataIndex: 'to',
                render: to => {
                    return <div style={{textAlign: "left"}}>{to}</div>
                },
            },
            {
                title: 'Amount',
                dataIndex: 'amount',
                render: amount => {
                    return <div style={{textAlign: "right"}}>{format_Number_int(amount)}</div>
                },
            },
            {
                title: 'Trans Type',
                dataIndex: 'transType',
                render: transType => {
                    return <div style={{textAlign: "right"}}>{(transType)}</div>
                },
            },
            {
                title: 'Balance',
                dataIndex: 'balance',
                render: balance => {
                    return <div style={{textAlign: "right"}}>{format_Number_int(balance)}</div>
                },
            },
            {
                title: 'Description',
                dataIndex: 'description',
                render: description => {
                    return <div style={{textAlign: "left"}}>{(description)}</div>
                },
            },
            {
                title: 'Transfer date',
                dataIndex: 'timeStamp',
                render: timeStamp => {
                    return <div
                        style={{textAlign: "right"}}>{moment(parseInt(timeStamp)).format("DD/MM/YYYY HH:mm:ss")}</div>
                },
            },
        ];
        this.columns2 = [
            {

                title: 'Ticket Number',
                dataIndex: 'ticketNumber',
                render: ticketNumber => {
                    return <div
                        style={{textAlign: "left"}}>{ticketNumber.substring((ticketNumber.indexOf('-') + 1), ticketNumber.length)}</div>
                },
            },
            {

                title: 'Ticket',
                dataIndex: 'ticketType',
                render: ticketType => {
                    return <div style={{textAlign: "left"}}>{TICKETS[ticketType]}</div>
                },
            },
            {
                title: 'Price',
                dataIndex: 'price',
                render: price => {
                    return <div style={{textAlign: "left"}}>{format_Number_int(price)}</div>
                },
            },
            {
                title: 'Purchase time ',
                dataIndex: 'buyDateTime',
                render: buyDateTime => {
                    return <div
                        style={{textAlign: "right"}}>{moment(parseInt(buyDateTime)).format("DD/MM/YYYY HH:mm:ss")}</div>
                },
            },
        ];

        this.columns4 = [
            {

                title: 'Ticket Number',
                dataIndex: 'ticketNumber',
                render: ticketNumber => {
                    return <div
                        style={{textAlign: "left"}}>{ticketNumber.substring((ticketNumber.indexOf('-') + 1), ticketNumber.length)}</div>
                },
            },
            {

                title: 'Ticket',
                dataIndex: 'ticketType',
                render: ticketType => {
                    return <div style={{textAlign: "left"}}>{TICKETS[ticketType]}</div>
                },
            },
            {

                title: 'Buyer',
                dataIndex: 'buyer',
                render: buyer => {
                    return <div style={{textAlign: "left"}}>{buyer}</div>
                },
            },
            {
                title: 'Price',
                dataIndex: 'price',
                render: price => {
                    return <div style={{textAlign: "left"}}>{format_Number_int(price)}</div>
                },
            },
          /*  {
                title: 'Purchase time ',
                dataIndex: 'buyDateTime',
                render: buyDateTime => {
                    return <div
                        style={{textAlign: "right"}}>{moment(parseInt(buyDateTime)).format("DD/MM/YYYY HH:mm:ss")}</div>
                },
            },*/
            {
                title: 'Used time ',
                dataIndex: 'useDateTime',
                render: useDateTime => {
                    return <div
                        style={{textAlign: "right"}}>{moment(parseInt(useDateTime)).format("DD/MM/YYYY HH:mm:ss")}</div>
                },
            },
        ];
        this.columns3 = [

            {

                title: 'Ticket Number',
                dataIndex: 'ticketNumber',
                render: ticketNumber => {
                    return <div
                        style={{textAlign: "left"}}>{ticketNumber.substring((ticketNumber.indexOf('-') + 1), ticketNumber.length)}</div>
                },
            },
            {

                title: 'Ticket',
                dataIndex: 'ticketType',
                render: ticketType => {
                    return <div style={{textAlign: "left"}}>{TICKETS[ticketType]}</div>
                },
            },
            {
                title: 'Price',
                dataIndex: 'price',
                render: price => {
                    return <div style={{textAlign: "left"}}>{format_Number_int(price)}</div>
                },
            },

            {

                title: 'Buyer',
                dataIndex: 'buyer',
                render: buyer => {
                    return <div style={{textAlign: "left"}}>{buyer}</div>
                },
            },
            {

                title: 'Owner',
                dataIndex: 'owner',
                render: buyer => {
                    return <div style={{textAlign: "left"}}>{buyer}</div>
                },
            },
            {
                title: 'Purchase time ',
                dataIndex: 'buyDateTime',
                render: buyDateTime => {
                    return <div
                        style={{textAlign: "right"}}>{moment(parseInt(buyDateTime)).format("DD/MM/YYYY HH:mm:ss")}</div>
                },
            },
            {

                title: 'Status',
                dataIndex: 'status',
                render: status => {
                    return <div style={{textAlign: "left"}}>{status}</div>
                },
            },
        ];

        this.columns5 = [

            {

                title: 'Ticket Number',
                dataIndex: 'ticketNumber',
                render: ticketNumber => {
                    return <div
                        style={{textAlign: "left"}}>{ticketNumber.substring((ticketNumber.indexOf('-') + 1), ticketNumber.length)}</div>
                },
            },
            {

                title: 'Ticket',
                dataIndex: 'ticketType',
                render: ticketType => {
                    return <div style={{textAlign: "left"}}>{TICKETS[ticketType]}</div>
                },
            },
            {
                title: 'Price',
                dataIndex: 'price',
                render: price => {
                    return <div style={{textAlign: "left"}}>{format_Number_int(price)}</div>
                },
            },

            {

                title: 'Owner',
                dataIndex: 'owner',
                render: owner => {
                    return <div style={{textAlign: "left"}}>{owner}</div>
                },
            },

            {
                title: 'Redeem time ',
                dataIndex: 'redeemDateTime',
                render: redeemDateTime => {
                    return <div
                        style={{textAlign: "right"}}>{moment(parseInt(redeemDateTime)).format("DD/MM/YYYY HH:mm:ss")}</div>
                },
            },
            {

                title: 'Status',
                dataIndex: 'status',
                render: status => {
                    return <div style={{textAlign: "left"}}>{status}</div>
                },
            },
        ];
    }

    async componentDidMount() {

         this.loadBalance()
         this.loadTrans()
         this.loadTickets()
         this.loadRedeemTickets()


    }

    loadBalance = async () => {
        let transactions = await UserService.getUserBoard()
        console.log(`====>`, transactions)
        // debugger
        this.setState({
            ...transactions.data,
        })
    }

    loadTrans = async () => {
        let transactions = await UserService.getUserTransactions()
        console.log(`====>`, transactions)
        // debugger
        this.setState({
            transactions: transactions.data
        })
    }

    loadTickets = async () => {
        let transactions = await UserService.getOwnerTickets()
        // console.log(`====>`, transactions)
        this.setState({
            tickets: transactions.data.map((item) => {
                item.key = item.ticketNumber;
                return item
            }),
            ownedItems: transactions.data.length
        })
    }
    loadRedeemTickets = async () => {
        let transactions = await UserService.getRedeemTickets()
        // console.log(`====>`, transactions)
        this.setState({
            redeemTickets: transactions.data.map((item) => {
                item.key = item.ticketNumber;
                return item
            }),
            // ownedItems: transactions.data.length
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
        this.setState({recipient: recipient.target.value});
    }

    handleOk = async () => {
        try {
            console.log('===>', await this.myRef1.current.validateFields())
            let result = await UserService.createNewTokens(this.state.newAmount)

            if (result.data.success) {
                console.log('result.data.data', result.data.data)
                this.setState({
                    ...result.data.data,
                    modal1Visible: false
                }, async () => await this.loadTrans());
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
            console.log('===>', await this.myRef.current.validateFields())
            let result = await UserService.transferTokens(this.state.recipient, this.state.newAmount)

            if (result.data.success) {
                console.log('result.data.data', result.data.data)
                this.setState({
                    balance: result.data.data.fromUpdatedBalance,
                    // ...result.data.data,
                    modal2Visible: false
                }, async () => await this.loadTrans());
            } else {
                this.setState({
                    modal2Visible: false
                }, () => notification.error({
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
            let result = await UserService.buyTicket(this.state.ticketType, this.state.ticketQuantity)
            console.log(`===>`, result)
            if (result.data && result.data.length >= 0) {
                // console.log('result.data.data', result.data.data)
                this.setState({
                    // balance:result.data.data.fromUpdatedBalance,
                    // ...result.data.data,
                    modal3Visible: false
                }, async () => {
                    this.loadTrans();
                    this.loadTickets();
                    this.loadBalance();

                });
            } else {
                this.setState({
                    modal3Visible: false
                }, () => notification.error({
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

    handleOkUseTicket = async () => {

        try {
            // await this.myRef.current.validateFields()
            let result = await UserService.useTicket(this.state.selectedRowKeys)
            console.log(`===>`, result)
            if (result.data && result.data.success) {
                // console.log('result.data.data', result.data.data)
                this.setState({
                    // balance:result.data.data.fromUpdatedBalance,
                    // ...result.data.data,
                    modal3Visible: false
                }, async () => {
                    this.loadTrans();
                    this.loadTickets();
                    this.loadBalance();

                });
            } else {
                this.setState({
                    modal3Visible: false
                }, () => notification.error({
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

    confirmUseTickets = () => {
        Modal.confirm({
            title: 'Confirm',
            icon: <ExclamationCircleOutlined/>,
            content: 'Are you sure?',
            okText: 'OK',
            cancelText: 'Cancel',
            onOk: this.handleOkUseTicket
        });
    }

    anyValidation = (rule, value, callback) => {
        if (value <= 0) {
            callback('Please enter value greater than 0');
        } else {
            callback();
        }
    }

    onChangeTicket = (ticketType) => {
        this.setState({ticketType})
    }
    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({selectedRowKeys});
    };

    render() {
        const {loading, selectedRowKeys} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        return (
            <div className="container">
                <PageHeader
                    onBack={() => window.history.back()}
                    title={this.state.username}
                    tags={<Tag color="blue">Running</Tag>}
                    subTitle={`${this.state.roles}`}
                    extra={[
                        this.state.roles && this.state.roles.length > 0 && this.state.roles[0] !== 'INTEGRATE' &&
                        <Button key="3" onClick={() => this.setModal3Visible(true)}>{`Buy Item`}</Button>,

                        <Button key="2" onClick={() => this.setModal2Visible(true)}>{`Transfer`}</Button>,
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
                            title={this.state.roles && this.state.roles.length > 0 && this.state.roles[0] === 'INTEGRATE' ? 'Not Yet Redeemed Tickets' : 'Owned Tickets'}
                            prefix=""
                            value={this.state.ownedItems}
                            style={{
                                margin: '0 32px',
                            }}
                        />
                        <Statistic title="Balance" suffix={'₫'} ix="d" value={this.state.balance}/>
                    </Row>
                    <Row>
                        <Tabs type="card" style={{width: `100%`, marginTop: 20}}>
                            <TabPane tab="Transactions" key="1">
                                {/*<div style={{marginTop:20,fontWeight:'bold',fontSize:15}}>Transactions:</div>*/}
                                <Table style={{width: '100%', marginTop: 10}} columns={this.columns}
                                       dataSource={this.state.transactions}/>
                            </TabPane>
                            {this.state.roles && this.state.roles.length > 0 && this.state.roles[0] === 'INTEGRATE' ?
                                <><TabPane tab="Not yet redeemed tickets" key="2">
                                    <div style={{marginBottom: 16, width: `100%`}}>
                                        {/*<Button type="primary" onClick={this.start} disabled={!hasSelected}
                                            loading={loading}>
                                        Use tickets at OD shop
                                    </Button>
                                    <span style={{marginLeft: 8}}>
                                        {hasSelected ? `Selected ${selectedRowKeys.length} tickets` : ''}
                                      </span>*/}
                                        <Table
                                            // rowSelection={rowSelection}
                                            style={{width: '100%', marginTop: 10}}
                                            columns={this.columns3} dataSource={this.state.tickets}/>
                                    </div>
                                </TabPane>
                                    <TabPane tab="Redeemed tickets" key="3">
                                        <div style={{marginBottom: 16, width: `100%`}}>
                                            <Table
                                                // rowSelection={rowSelection}
                                                style={{width: '100%', marginTop: 10}}
                                                columns={this.columns5} dataSource={this.state.redeemTickets}/>
                                        </div>
                                    </TabPane>
                                </> : <TabPane tab="Tickets" key="2">
                                    <div style={{marginBottom: 16, width: `100%`}}>
                                        <Button type="primary" onClick={this.confirmUseTickets} disabled={!hasSelected}
                                                loading={loading}>
                                            {this.state.roles && this.state.roles.length > 0 && this.state.roles[0] === 'OILDEPOT' ?
                                                `Redeem tickets at Integrate for Tokens`:`Use tickets at OD shop`}
                                        </Button>
                                        <span style={{marginLeft: 8}}>
                                        {hasSelected ? `Selected ${selectedRowKeys.length} tickets` : ''}
                                      </span>
                                        {this.state.roles && this.state.roles.length > 0 && this.state.roles[0] === 'OILDEPOT' ?
                                            (<Table rowSelection={rowSelection} style={{width: '100%', marginTop: 10}}
                                                    columns={this.columns4} dataSource={this.state.tickets}/>) :
                                            (<Table rowSelection={rowSelection} style={{width: '100%', marginTop: 10}}
                                                    columns={this.columns2} dataSource={this.state.tickets}/>)}

                                    </div>
                                </TabPane>}


                        </Tabs>

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
                                style={{width: `100%`}}
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
                                <Option value="OI93EX">Castrol GTX [SL 20W-50] 4L - 465.000 ₫</Option>
                                <Option value="ZMGPBJ">Mobil Super 2000 [SP 10W-40] 4L - 900.000 ₫</Option>
                                <Option value="QW5ZGQ">Mobil Super Motor Synthetic [SL 10W-40, MA2] 0.8L - 140.000
                                    ₫</Option>
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
