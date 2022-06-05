# extendHTML.js
a front-end framework that makes it easy to write HTML and bind Elements in Javascript

```javascript
var el = html`<div>
    <ul child="list"></ul>
    <input type="text" data="todo" placeholder="name">
    <button method="add_to_list">add to list</button>
</div>`

//Example 1 
el.extend((child,data)=>{
    var listitem = (data) => html`<li>${data.todo}<li>`
    return {
        add_to_list:function(){
            child.list.append(listitem(data))
        }
    }
})

//Example 2 
el.extend({
        add_to_list:function({data,child}){
            var listitem = (data) => html`<li>${data.todo}<li>`
            child.list.append(listitem(data))
        }
    })

```