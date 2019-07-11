let http =require('http');
let fs = require('fs');
let path = require('path');
let url = require('url');
let pageSize = 5;// 每页显示5 个

let sliders = [
  '//m.360buyimg.com/mobilecms/s750x366_jfs/t1/74572/38/1196/97936/5cf7b2f8E3fbeff25/68f7cc199affdaf0.jpg!cr_1125x549_0_72!q70.jpg.dpg',
  '//m.360buyimg.com/mobilecms/s750x366_jfs/t1/69467/39/1488/108006/5cfbd75cE05606923/eb7b80c905210fbf.jpg!cr_1125x549_0_72!q70.jpg.dpg',
  '//m.360buyimg.com/mobilecms/s750x366_jfs/t1/31162/17/1128/101786/5c46ead8E22ee9740/f66061da227c1965.jpg!cr_1125x549_0_72!q70.jpg.dpg',
  '//m.360buyimg.com/mobilecms/s750x366_jfs/t1/57551/20/4290/151138/5d204c9eEf77d9439/88815690fc811757.jpg!cr_1125x549_0_72!q70.jpg.dpg',
  '//m.360buyimg.com/mobilecms/s750x366_jfs/t1/70294/40/3768/138830/5d2048c8E2fb2a74e/3eae798fc5815673.jpg!cr_1125x549_0_72!q70.jpg.dpg'
]

// 封装读取文件
function read (callback) {
  fs.readFile('./book.json', 'utf8', function(err, data) {
    if (err || data.length == 0) {
      callback([])
    } else {
      callback(JSON.parse(data))
    }
  })
}
// 封装写文件
function write (data,callBack) {
  let str = JSON.stringify(data,"","\t");
  fs.writeFile('./book.json',str,(err)=>{
    if (err) throw err;
    console.log('文件已被保存');
      callBack();
  })
}

http.createServer((req,res)=>{
  let {pathname,query} = url.parse(req.url, true);//true吧query转化为对象
  console.log(req.url)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (req.method == 'OPTIONS') {
    return res.end('')
  }
  if(pathname === '/sliders'){
    res.setHeader('Content-Type', 'application/json;charset=utf8');
    return res.end(JSON.stringify(sliders))
  }
  if(pathname === '/hot'){
    read(function(books) {
      let hot = books.reverse().slice(0,4)  // 只显示4本 后天现实的书籍显示在最前面
      res.setHeader('Content-Type', 'application/json;charset=utf8');
      // res.end(JSON.stringify(hot));
      // 3秒延迟
      setTimeout(() => {
        res.end(JSON.stringify(hot));
      },1000)
    })
    return
  }
  // 获取更多
  if(pathname === '/more'){
    let offset = parseInt(query.offset) || 0;
    read(function(books) {
      // 每次偏移量在偏移量的基础上增加pageSize条
      let hot = books.slice(offset,offset+pageSize);
      let hasMore = true; // 默认有更多
      if (books.length <= offset + pageSize) {
        // 已显示的数目 大于总条数
        hasMore = false;
      }
      res.setHeader('Content-Type', 'application/json;charset=utf8');
      setTimeout(() => {
        res.end(JSON.stringify({hasMore, morebooks: hot}));
      }, 1000);

    })
    return
  }
  if (pathname === '/book') { // 对书进行增删改查
    let id = parseInt(query.id); // 取出来的是字符串
    switch (req.method){ // ?id=1
      case 'GET':
        if(id > 0 || id == 0) {
          read(function(books){
            let book = books.find(item => item.bookId === id);
            if(!book){
              book = {}
            }
            res.setHeader('Content-Type', 'application/json;charset=utf8');
            res.end(JSON.stringify(book))
          })
        }else{
          // 获取所有图书
          read(function(books) {
            res.setHeader('Content-Type', 'application/json;charset=utf8');
            res.end(JSON.stringify(books))
          })
        }
        break;
      case 'POST':
        let book = {};
        req.on('data', function(chunk){// 这里是二进制数据缓存区需要进行转化一下 方可使用
          book= chunk.toString('utf8',0,chunk.length);// 此时转化出来的是字符串
          book= JSON.parse(book);
        });
        req.on('end',() =>{
          read(function(books){
            console.log(id)
            // if (id || id === 0) {
            //   books = books.map(item => {
            //     if (item.bookId === id) { // 找到id相同的那一本书
            //       return book;
            //     }
            //     return item; // 其他书正常返回即可
            //   });
            // } else {
            //   book.bookId=books.length?books[books.length-1].id:1;
            //   books.push(book);
            // }
            //
            book.bookId=books.length?books[books.length-1].bookId+1:1;
            books.push(book);

            write(books,function(){
              res.end(JSON.stringify(book))
              console.log('成功')
            });
          })
        });
        break;
      case 'PUT':
          let book2 = {};
          req.on('data', function(chunk){// 这里是二进制数据缓存区需要进行转化一下 方可使用
            book2= chunk.toString('utf8',0,chunk.length);// 此时转化出来的是字符串
            book2= JSON.parse(book2);
          });
          req.on('end',() => {
            read(function(books){
              books = books.map(item => {
                if (item.bookId === id) { // 找到id相同的那一本书
                  return book2;
                }
                return item; // 其他书正常返回即可
              });
              // 写到文件里面去
              write(books,function(){
                res.end(JSON.stringify(book2))
                console.log('成功')
              });
            })
          })
        break;
      case 'DELETE':
        read(function(books){
          books = books.filter(item => item.bookId !== id);
          console.log(books.length);
          res.setHeader('Content-Type', 'application/json;charset=utf8');
          res.end(JSON.stringify(books))
        })
        break;
    }
    return
  }

  // 为 本地静态文件  建立server
  // start
  fs.stat('.'+ pathname, (err, stats) => {
    if (err) {
      res.statusCode = 404;
      res.end('NOT FOUND...')
    }else {
      if (stats.isDirectory()) {// 判断是不是目录
        let p = path.join('.'+ pathname, './index.html');
        fs.createReadStream(p).pipe(res)
      }else {
        fs.createReadStream('.' + pathname).pipe(res)// 读一个文件留
      }

    }
  })
// ending
}).listen(3000);
