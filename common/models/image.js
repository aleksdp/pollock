const CONTAINERS_URL = '/api/containers/'


module.exports = (Image) => {
    Image.upload = (ctx, cb) => {
        ctx.req.params.container = 'images'
        const file = Image.app.models.container.upload(ctx.req, ctx.result, {
            getFilename: function (file, req, res) {
                var origFilename = file.name;
                var parts = origFilename.split('.'),
                    extension = parts[parts.length-1];
                return `${Math.floor(Math.random() * (20 - 2)) + 20}_${(new Date()).getTime()}.${extension}`;
            }
        }, (err, {files, fields} = {})=>{
            if(err) {
                cb(err);
            }else{
                if(!files){
                    cb('error')
                }
                const {file} = files
                Image.create({
                    name: file[0].name,
                    fields: {
                        type: fields.type ? fields.type[0]: undefined
                    },
                    url: CONTAINERS_URL+file[0].container+'/download/'+file[0].name,
                    container: file[0].container
                }, (err, res)=>{
                    if (err !== null) {
                        cb(err);
                    } else {
                        cb(null, res);
                    }
                })
            }
        })
    }

    Image.remoteMethod('upload', {
            description: 'Uploads a file',
            accepts: [
                { arg: 'ctx', type: 'object', http: { source:'context' } },
            ],
            returns: {
                arg: 'fileObject', type: 'object', root: true
            },
            http: {verb: 'post'}
        }
    )

}