# SERVER MVP IMAGE

## Routes

### Get All Image

- Method
    - **GET**
- Route
    - `/images`
- Response
    - `code: 200`
    ```JS
    [
        {
            "image": "<Image URL>",
            "created_at": "<Date>",
            "updated_at": "<Date>",
            "__v": 0
        },
        { "<Object Image>" }, ...
    ]
    ```

### Get One Image

- Method
    - **GET**
- Route
    - `/images/:id`
- Response
    - `code: 200`
    ```JS
    [
        {
            "image": "<Image URL>",
            "created_at": "<Date>",
            "updated_at": "<Date>",
            "__v": 0
        }
    ]
    ```

### Create Image

- Method
    - **POST**
- Route
    - `/images`
- Body
    - FormData
        - image: file
- Headers
    - `{ accesstoken: "<generated access token>"}`
- Response
    `code: 201`
    ```JS
    {
        "image": "...",
        "created_at": "<Date>",
        "updated_at": "<Date>",
        "__v": 0
    }
    ```
### Update Image

- Method
    - **PATCH**
- Route
    - `/images/:id`
- Header
    - `{ accesstoken: "<generated access token>"}`
- Body
    - FormData
        - image: file
- Response
    - `code: 200`
    ```JS
    {
        n: 1,
        nModified: 1,
        ok: 1
    }
    ```
### Delete Image

- Method
    - **DELETE**
- Route
    - `/images/:id`
- Header
    - `{ accesstoken: "<generated access token>"}`
- Body
    - FormData
        - image: file
- Response
    - `code: 200`
    ```JS
    {
        n: 1,
        deletedCount: 1,
        ok: 1
    }
    ```

---

## Error Response

### The error response includes following fields :

- Message: the error message
- Details: a field for additional information, which may or may not be populated
- Description: description of the specific error
- Code: Unique error response code
- Http_response:
    ```
    Message: HTTP response message
    Code: HTTP response status code
    ```

### Example Code :

- `code : 400`
```
    BAD REQUEST
    Invalid syntax for this request was provided
```
- `code : 401`
```
    UNAUTHORIZED
    Account is not authorized to access the requested resource
```
- `code : 403`
```
    FORBIDDEN
    Account is not authorized to access the requested resource
```
- `code : 404`
```
    NOT FOUND
    Could not find the resource you requested
```
- `code : 500`
```
    INTERNAL SERVER ERROR
    Unexpected internal server error
```

---

## Usage

Run this command: 

```
$ npm install
$ nodemon app.js
```

## Access point:

http://localhost:3000