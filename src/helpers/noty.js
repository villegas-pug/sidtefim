import '../../node_modules/noty/lib/noty.css'
import '../../node_modules/noty/lib/themes/semanticui.css'
import Noty from 'noty'

export default (type, text) => {
   new Noty({
      type: type.toLowerCase(),
      layout: 'bottomRight',
      theme: 'semanticui',
      timeout: 3500,
      text,
      /* killer: true, */
      /* modal: true, */
   }).show()
}