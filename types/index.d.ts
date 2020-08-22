// TypeScript Version: 3.4

import {Plugin} from 'unified'
import {Schema} from 'hast-util-sanitize'

declare const rehypeSanitize: Plugin<[Schema?]>

export = rehypeSanitize
