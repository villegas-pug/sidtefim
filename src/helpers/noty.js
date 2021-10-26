import '../../node_modules/noty/lib/noty.css'
import '../../node_modules/noty/lib/themes/bootstrap-v3.css'
import Noty from 'noty'

export default (type, text) => {
   new Noty({
      type: type.toLowerCase(),
      layout: 'bottomLeft',
      theme: 'bootstrap-v3',
      timeout: 1500,
      text,
      killer: true,
      modal: true,
   }).show()
}