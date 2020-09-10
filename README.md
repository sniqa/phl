# prij

## Usage

```shell
const { Rpj } = require('rpj');

const rpj = new Rpj({
  interfaces: controllers
})
```

### Example for Koa

```shell
//Get interface collection
const ctl = require("./controller")

const { Rpj, playground } = require("rpj")
const rpj = new rpj({
  interfaces: ctl,
})

//Open test page
router.get("/rpj", (ctx) => {
  ctx.body = playground()
})

//Request processing
router.post("/rpj", async (ctx) => {
  const request = ctx.request.body
  const res = await rpj.handler(request)

  ctx.body = res
})

```
