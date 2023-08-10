import storage from "@/store/store";
import {HAS_LOGIN, USER_INFO} from "@/store/constant";

import router from "@/router";
export const user = {
    name: 'User',
    phone: '123456',
    id: undefined,
    userInfo: undefined,
    removeLoginState: () => {
        storage.remove(HAS_LOGIN)
        router.go(0)
    },
    getUserInfo:()=>{
        return storage.get(USER_INFO)
    }
}

export const userAvatar = [
    require('@/assets/user.png'),
    require('@/assets/user_1.png'),
    require('@/assets/user_2.png'),
    require('@/assets/user_3.png'),
    require('@/assets/user_4.png'),

]


export const app = {

    appName: '信息检索平台',
    copyRight: '远光软件股份有限公司',
    registerPage:'信息检索平台注册页面'
}

export const template = {
    map: {
        button:[
            {
                text:'圆形按钮',
                value:0
            },
            {
                text:'方形按钮',
                value:1
            },
            {
                text:'白底按钮',
                value:2
            }
        ],
        buttonText:(value)=>{
            return template.map.button.find(i=>{
                return i.value===value
            }).text
        },
        color:[
            {
                text:'黄色',
                value:'#FEFEBE'
            },
            {
                text:'绿色',
                value:'#EDF8BB'
            },
            {
                text:'白色',
                value:'#E8FFFB'
            },
            {
                text:'蓝色',
                value:'#C3E7FE'
            },
            {
                text:'紫色',
                value:'#F5E8FF'
            }
        ],
        searchs:[
            {
                text:'高级搜索',
                value:'高级搜索'
            },
            {
                text:'初级搜索',
                value:'初级搜索'
            }
        ],
        style:[
            {
                text:'一号字体',
                value:'24px'
            },
            {
                text:'二号字体',
                value:'18px'
            },
            {
                text:'三号字体',
                value:'14px'
            },
            {
                text:'四号字体',
                value:'9px'
            }
        ]
    }
}


export const getTags = (tag) => {
    let r = tags.find(i => {
        return i.value === tag
    })
    return r.text
}


export function resetUserState() {
    storage.remove(HAS_LOGIN)
    storage.remove(USER_INFO)
    router.go(0)
}
