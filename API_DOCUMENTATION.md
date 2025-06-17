# POKT Radar API Documentation

This document provides detailed information about all available endpoints in the POKT Radar API, including parameters, responses, and examples.

## Table of Contents

1. [Home Endpoint](#1-home-endpoint)
2. [Address Endpoints](#2-address-endpoints)
   - [Address Overview](#21-address-overview)
   - [Address Balance](#22-address-balance)
   - [Address Transactions](#23-address-transactions)
3. [Transaction Endpoints](#3-transaction-endpoints)
   - [Transactions List & Single Transaction](#31-transactions-list--single-transaction)
4. [Block Endpoints](#4-block-endpoints)
   - [Blocks List & Single Block](#41-blocks-list--single-block)
5. [Relay Endpoints](#5-relay-endpoints)
   - [Relay Data](#51-relay-data)
6. [Governance Endpoints](#6-governance-endpoints)
   - [Governance Data](#61-governance-data)

---

## 1. Home Endpoint

### `GET /api/home`

Returns dashboard data for the home page, including blocks, transactions, market data, and staking information.

#### Parameters

None

#### Response

```json
{
  "dataBlock": [...],
  "dataChartVetical": [...],
  "dataTrasaction": [...],
  "lastBlock": {...},
  "market": {...},
  "price": {...},
  "resultDought": [...],
  "produce": [...],
  "staking": [...]
}
```

#### Example

```bash
curl "https://poktradar.io/api/home"
```

---

## 2. Address Endpoints

### 2.1 Address Overview

### `GET /api/address`

Returns comprehensive information about an address, including account details, node information, transactions, and price data.

#### Parameters

| Parameter | Type   | Required | Description                                 |
| --------- | ------ | -------- | ------------------------------------------- |
| address   | string | Yes      | The POKT address to query                   |
| SKIP      | number | No       | Number of transactions to skip (default: 0) |

#### Response

```json
{
  "transactions": [...],
  "account": {...},
  "nodes": [...],
  "price": {...},
  "stake": {...}
}
```

#### Example

```bash
curl "https://poktradar.io/api/address?address=pokt1abc123..."
```

### 2.2 Address Balance

### `GET /api/address/balance`

Returns only the balance information for a specific address.

#### Parameters

| Parameter | Type   | Required | Description               |
| --------- | ------ | -------- | ------------------------- |
| address   | string | Yes      | The POKT address to query |

#### Response

```json
{
  "message": "Success",
  "address": "pokt1abc123...",
  "balance": 1000000
}
```

#### Example

```bash
curl "https://poktradar.io/api/address/balance?address=pokt1abc123..."
```

### 2.3 Address Transactions

### `GET /api/address/transactions`

Returns only the transactions associated with a specific address.

#### Parameters

| Parameter | Type   | Required | Description                                                      |
| --------- | ------ | -------- | ---------------------------------------------------------------- |
| address   | string | Yes      | The POKT address to query                                        |
| limit     | number | No       | Maximum number of transactions to return (default: 10, max: 100) |

#### Response

```json
{
  "message": "Success",
  "address": "pokt1abc123...",
  "limit": 10,
  "totalCount": 10,
  "transactions": [
    {
      "_id": "...",
      "hash": "0x1234567890...",
      "height": 12345,
      "amount": 100000,
      "block_time": "2024-01-15T10:30:00Z",
      "from_address": "addr1...",
      "to_address": "addr2...",
      "index": 0,
      "memo": "",
      "result_code": 0,
      "total_fee": 1000,
      "type": "send",
      "chain": "POKT"
    }
  ]
}
```

#### Example

```bash
curl "https://poktradar.io/api/address/transactions?address=pokt1abc123...&limit=20"
```

---

## 3. Transaction Endpoints

### 3.1 Transactions List & Single Transaction

### `GET /api/transaction`

Returns a list of transactions or details of a specific transaction if a hash is provided.

#### Parameters

| Parameter | Type   | Required | Description                                    |
| --------- | ------ | -------- | ---------------------------------------------- |
| hash      | string | No       | Transaction hash to get a specific transaction |
| PAGE_SIZE | number | No       | Number of transactions to return (default: 10) |

#### Response (List)

```json
{
  "transactions": [...],
  "chartData": [...]
}
```

#### Response (Single Transaction)

```json
{
  "transation": {
    "hash": "0x1234567890...",
    "height": 12345,
    "amount": 100000,
    "block_time": "2024-01-15T10:30:00Z",
    "from_address": "addr1...",
    "to_address": "addr2...",
    "type": "send"
  }
}
```

#### Examples

```bash
# Get transaction list
curl "https://poktradar.io/api/transaction?PAGE_SIZE=20"

# Get specific transaction
curl "https://poktradar.io/api/transaction?hash=0x1234567890..."
```

---

## 4. Block Endpoints

### 4.1 Blocks List & Single Block

### `GET /api/block`

Returns a list of blocks or details of a specific block if a height is provided.

#### Parameters

| Parameter | Type   | Required | Description                                  |
| --------- | ------ | -------- | -------------------------------------------- |
| height    | number | No       | Block height to get a specific block         |
| limit     | number | No       | Number of blocks to return (default: 10)     |
| skip      | number | No       | Number of transactions to skip (default: 0)  |
| take      | number | No       | Number of transactions to take (default: 10) |

#### Response (List)

```json
{
  "blocks": [...]
}
```

#### Response (Single Block)

```json
{
  "block": {...},
  "count": 42,
  "transactions": [...]
}
```

#### Examples

```bash
# Get block list
curl "https://poktradar.io/api/block?limit=20"

# Get specific block
curl "https://poktradar.io/api/block?height=12345&skip=0&take=20"
```

---

## 5. Relay Endpoints

### 5.1 Relay Data

### `GET /api/relay`

Returns relay data including chain-specific relay information and chart data.

#### Parameters

None

#### Response

```json
{
  "dataChart": [
    {
      "date": "2023-01-01",
      "count": 1000000
    }
  ],
  "dataRelay": [
    {
      "chain": "ETH",
      "total_relays": 5000000,
      "logoURL": "https://example.com/eth.png",
      "gateway": 42
    }
  ]
}
```

#### Example

```bash
curl "https://poktradar.io/api/relay"
```

---

## 6. Governance Endpoints

### 6.1 Governance Data

### `GET /api/governace`

Returns governance data including parameters, transactions, expenses, income, and DAO balance.

#### Parameters

| Parameter | Type   | Required | Description                                        |
| --------- | ------ | -------- | -------------------------------------------------- |
| limit     | number | No       | Number of governance items to return (default: 10) |

#### Response

```json
{
  "params": {...},
  "dataTransaction": [...],
  "dataExpense": [...],
  "dataIncome": [...],
  "daoBalance": {...}
}
```

#### Example

```bash
curl "https://poktradar.io/api/governace?limit=20"
```

---

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request

```json
{
  "message": "Bad Request",
  "error": "Specific error message"
}
```

### 404 Not Found

```json
{
  "message": "Not Found",
  "error": "Resource not found"
}
```

### 405 Method Not Allowed

```json
{
  "message": "Method Not Allowed"
}
```

### 500 Internal Server Error

```json
{
  "message": "Internal Server Error",
  "error": "Error details (if available)"
}
```

---

## Base URL

The base URL for all API endpoints is defined in the environment variable `NEXT_PUBLIC_API_BASE_URL`. By default, it is set to `https://poktradar.io/`.

## Authentication

Currently, the API does not require authentication for access.

---

_This documentation was last updated on June 2024._
