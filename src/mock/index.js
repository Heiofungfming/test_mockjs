import Mock from 'mockjs'

// const data = Mock.mock({
//     'string|1-4':'@cword(3,10)'
// })

// const data = Mock.mock({
//     'list|8':[
//         {
//             name: '@cname()',
//             idCard:'@id()',
//             address:'@city(true)',
//             date: '@date(yyyy-MM-dd hh:mm:ss)',
//             ID:'@increment(1)'
//         }
//     ]  
// })
// console.log(data)

let {newsList} = Mock.mock({
    'newsList|75': [
        {
            "id":"@increment()",
            "title":"@ctitle()",
            "content":"@cparagraph(5,15)",
            "img_url":"@image('100x100','#FF83FA','#333333','png','坤坤')",
            "add_time":"@date(yyyy-MM-dd hh:mm:ss)"
        }
    ]
})

const getQuery = (url,name)=>{
    const index =url.indexOf('?')
    if(index != -1){
        const queryArr = url.substr(index+1).split('&')
        for (let i=0;i<queryArr.length;i++){
            const itemArr = queryArr[i].split('=')
            if (itemArr[0] === name) {
                return itemArr[1]
            }           
        }
    }
    return null
}

Mock.mock(/\/api\/get\/news/,'get',(options)=>{
    //获取传递的参数
    const pageindex = getQuery(options.url,'pageindex')
    const pagesize = getQuery(options.url,'pagesize')
    // console.log(pageindex);
    // console.log(pagesize);
    
    //截取数据
    const start = (pageindex-1)*pagesize
    const end = pageindex*pagesize

    //总页数
    const totalPage = Math.ceil(newsList.length/pagesize)

    const list = pageindex>totalPage?[]:newsList.slice(start,end)
    
    return {
        status:200,
        msg:'获取新闻列表成功！',
        list: list,
        total: newsList.length
    }
})

Mock.mock('/api/add/news','post',(options)=>{
    console.log(options);
    const body = JSON.parse(options.body)
    newsList.push(Mock.mock({
        "id":"@increment()",
        "title":body.title,
        "content":body.content,
        "img_url":"@image('100x100','#FF83FA','#333333','png','坤坤')",
        "add_time":"@date(yyyy-MM-dd hh:mm:ss)"
    }))
    return {
        tatus:200,
        msg:'添加成功！',
        list: newsList,
        total: newsList.length 
    }
})

Mock.mock('/api/delete/news','post',(options)=>{
    
    const body = JSON.parse(options.body)
    console.log(body.id);
    // newsList.splice(body.id-1,1) 
    newsList = newsList.filter(item => item.id != body.id)

    return {
        tatus:200,
        msg:'删除成功！',
        list: newsList,
        total: newsList.length 
    }
})