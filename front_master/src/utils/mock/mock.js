import Mock from 'mockjs'

const Random = Mock.Random
// const mobile = Random.integer(10198788990, 19987999876)
// const yibai = Random.integer(0, 100)



export function setMock (){
    Random.extend({
        rightStatus: function () {
            const workStatus = [1, 2, 3]
            return this.pick(workStatus)
        },
        isBool: function () {
            const workStatus = [0, 1]
            return this.pick(workStatus)
        },
        reportStatus: function () {
            const reportStatus = [1, 2, 3]
            return this.pick(reportStatus)
        },
        hallStatus: function () {
            const workStatus = [0, 1, 2]
            return this.pick(workStatus)
        },
        releaseStatus: function () {
            const status = [5, 6]
            return this.pick(status)
        },
        ownShare: function () {
            const status = [10, 20, 30, 40, 50, 60, 70, 80, 90]
            return this.pick(status)
        }
    })
    Mock.mock(/\/api\/user\/list/, {
        "code": 0,
        "data": {
            "countId": "",
            "current": 0,
            "maxLimit": 0,
            "optimizeCountSql": true,
            "orders": [
                {
                    "asc": true,
                    "column": ""
                }
            ],
            "pages": 0,
            "records|10": [
                {
                    "avatarUrl": "",
                    "createTime": "2023-07-29T11:53:02.000+00:00",
                    "id|+1": 0,
                    "isDeleted": 0,
                    "searchStatus": 0,
                    "tenantCode": "zuel",
                    "updateTime": "2023-07-29T11:53:02.000+00:00",
                    "userAccount": "@cname",
                    "userName": "@cname",
                    "userPwd": "12345678",
                    "userRole": "@isBool"
                }
            ],
            "searchCount": true,
            "size": 50,
            "total": 10
        },
        "description": "",
        "message": ""
    })

}
