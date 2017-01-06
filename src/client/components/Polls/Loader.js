import React from 'react'
import {fetchData} from 'react-security-fetcher'

export default class Loader extends React.Component{

    load = async () => {
        try{
            const {files} = this.refs.files
            if(!files.length) return new Error('empty value')
            for(let file in files){
                if(files.hasOwnProperty(file)){
                    const body = new FormData()
                    body.append('file', files[file])
                    this.props.input.onChange(await fetchData('/images/upload', 'POST', {type: 'form-data', params: body}))
                }
            }
            this.refs.files.value = ''
        }
        catch (e){
            //
        }

    }

    render(){
        return (
            <input type='file' ref='files' onChange={this.load} multiple={this.props.multiple && 'multiple'}/>
        )
    }
}