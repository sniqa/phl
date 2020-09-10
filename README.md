# prij

## Usage

```shell
const { Prj } = require('prj');

const prj = new Prj({
  interfaces: controllers
})
```

### Example for Koa

```shell
//Get interface collection
const ctl = require("./controller")

const { Prj, playground } = require("prj")
const prj = new Prj({
  interfaces: ctl,
})

//Open test page
router.get("/prj", (ctx) => {
  ctx.body = playground()
})

//Request processing
router.post("/prj", async (ctx) => {
  const request = ctx.request.body
  const res = await phl.handler(request)

  ctx.body = res
})

```
