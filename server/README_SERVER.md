# I. ProductBase:

### Interface:

    ProductBaseTypes = {
        id: { type: String || Number },
        name: { type: String, required: true },
        description: { type: String },
        image: { type: String },
        isActive: { type: Boolean, default: true },
        orderNumber: { type: Number },
        color: { type: String },
        sizePrint: { type: String },
        exportIncludeBase: { type: Boolean, default: true },
        editzonRadius: { type: String },
        createdAt: {type: String},
        updatedAt: {type: String},
    }

### Methods:

1. POST: (`/product-base/create`)

    - req: `body<Json>?: ProductBaseTypes`
    - res: `{ message?: string, newRecord?: ProductBaseTypes }`

2. POST: (`/product-base/createBulk`)

    - req: `body<Json>?: ProductBaseTypes[]`
    - res: `{ message?: string, newRecords?: ProductBaseTypes[] }`

3. PUT: (`/product-base/update`)

    - req: `body<Json>?: ProductBaseTypes`
    - res: `{ message?: string, modifiedCount?: number }`

4. PUT: (`/product-base/updateBulk`)

    - req: `body<Json>?: { ids?: string[] | number[], data?: ProductBaseTypes }`
    - res: `{ message?: string, modifiedCount?: number }`

5. GET: (`/product-base/getById`)

    - req: `params: { id?: string | number }`
    - res: `{ message?: string, data?: ProductBaseTypes }`

6. GET: (`/product-base/getAll`)

    - req: `params: {}`
    - res: `{ message?: string, newRecords?: ProductBaseTypes[] }`

7. DELETE: (`/product-base/deleteById`)

    - req: `params: { id?: string | number }`
    - res: `{ message?: string, deletedCount?: number }`

8. DELETE: (`/product-base/deleteBulk`)

    - req: `body<Json>: { "ids"?: number[] | string[] }`
    - res: `{ message?: string, deletedCount?: number }`

## API Status

| Status | Info                   | Infor detail                                            |
| ------ | ---------------------- | ------------------------------------------------------- |
| 200    | OK                     | Trả về trong các phương thức GET, PUT, PATCH, DELETE.   |
| 201    | Created                | Trả về khi tạo xong tài nguyên                          |
| 204    | No Content             | Trả về khi xoá xong 1 tài nguyên                        |
| 304    | Not Modified           | Tài nguyên không có thay đổi, client có thể dùng cache. |
| 400    | Bad Request            | Request không hợp lệ                                    |
| 401    | Unauthorized           | Request không quyền truy cập.                           |
| 403    | Forbidden              | Request bị bẻ gãy, từ chối truy cập.                    |
| 404    | Not Found              | Không tìm thấy tài nguyên trong từ URI                  |
| 405    | Method Not Allowed     | Phương thức không được phép                             |
| 410    | Gone                   | Tài nguyên không tồn tại                                |
| 415    | Unsupported Media Type | Không hỗ trợ kiểu tài nguyên                            |
| 422    | Unprocessable Entity   | Dữ liệu không được xử lý                                |
| 429    | Too Many Requests      | Có quá nhiều request                                    |
