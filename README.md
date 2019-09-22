# SERVER MVP IMAGE

## Routes

### Get All Image

- Method
    - **GET**
- Route
    - `/images`
- Body
    - limit: Number (Number of how many photos wanted)    
- Response
    - `code: 200`
    ```JS
        [{
            "description": [
                {
                    "name": "Building",
                    "coordinates": [
                        {
                            "x": 0.009003288112580776,
                            "y": 0.11136158555746078
                        },
                        {
                            "x": 0.9957922101020813,
                            "y": 0.11136158555746078
                        },
                        {
                            "x": 0.9957922101020813,
                            "y": 0.8152372241020203
                        },
                        {
                            "x": 0.009003288112580776,
                            "y": 0.8152372241020203
                        }
                    ]
                }
            ],
            "label": [
                "Building",
                "Architecture",
                "Landmark",
            ],
            "_id": "5d873448c8edd4bf61c91bb9",
            "owner": "5d85a0d113c6a18483e0833c",
            "featured_image": "https://storage.googleapis.com/nfs-ecommerce/upload/1569141815896",
            "created_at": "2019-09-22T08:43:52.700Z",
            "updated_at": "2019-09-22T08:43:52.700Z",
            "__v": 0
        }]
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
            "description": "<Array>",
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
    - image: String (base64)
- Headers
    - `{ accesstoken: "<generated access token>"}`
- Response
    `code: 201`

### Delete Image

- Method
    - **DELETE**
- Route
    - `/images/:id`
- Header
    - `{ accesstoken: "<generated access token>"}`
- Body: -
- Response
    - `code: 200`
    ```JS
        {
            "message": "Image deleted"
        }
    ```

### Find My Image

- Method
    - **GET**
- Route
    - `/find/myImage`
- Header
    - `{ accesstoken: "<generated access token>"}`
- Body: -
- Response
    - `code: 200`


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

http://localhost:3000 or http://35.247.145.241/