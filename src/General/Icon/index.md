# Icon 图标

| 参数 | 类型 | 说明 | 默认值 |
| :-: | :-: | :-: | :-: |
| size | `string \| number` | 图标大小，支持数字(px)或字符串（如 20px, 1.5rem） | 30px |
| onClick | `(event: React.MouseEvent) => void` | 点击图标时的回调函数 | - |
| name | `string` | 图标名称，用于指定要显示的图标 | - |
| className | `string` | 自定义类名，用于覆盖默认样式 | - |
| style | `React.CSSProperties` | 自定义样式对象，用于覆盖默认样式 | - |

## 图标展示

```jsx
import { Icon, message } from 'IceCream-UI';
import React from 'react';

const IconDemo = () => {
  const handleCopy = (name) => {
    navigator.clipboard
      .writeText(name)
      .then(() => {
        message.success('复制成功');
      })
      .catch(() => {
        message.error('复制失败');
      });
  };

  return (
    <div className="icon-demo">
      <div className="icon-demo-row">
        <div className="icon-demo-item" onClick={() => handleCopy('icon_settings')}>
          <div className="icon-demo-icon">
            <Icon name="icon_settings"></Icon>
          </div>
          <div className="icon-demo-name">settings</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon-edit')}>
          <div className="icon-demo-icon">
            <Icon name="icon-edit"></Icon>
          </div>
          <div className="icon-demo-name">edit</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon-menu')}>
          <div className="icon-demo-icon">
            <Icon name="icon-menu"></Icon>
          </div>
          <div className="icon-demo-name">menu</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('iconpause')}>
          <div className="icon-demo-icon">
            <Icon name="iconpause"></Icon>
          </div>
          <div className="icon-demo-name">pause</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('iconstop')}>
          <div className="icon-demo-icon">
            <Icon name="iconstop"></Icon>
          </div>
          <div className="icon-demo-name">stop</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('iconuser')}>
          <div className="icon-demo-icon">
            <Icon name="iconuser"></Icon>
          </div>
          <div className="icon-demo-name">user</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('pause-')}>
          <div className="icon-demo-icon">
            <Icon name="pause-"></Icon>
          </div>
          <div className="icon-demo-name">pause</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_refresh')}>
          <div className="icon-demo-icon">
            <Icon name="icon_refresh"></Icon>
          </div>
          <div className="icon-demo-name">refresh</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon-addcard')}>
          <div className="icon-demo-icon">
            <Icon name="icon-addcard"></Icon>
          </div>
          <div className="icon-demo-name">addcard</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon-close')}>
          <div className="icon-demo-icon">
            <Icon name="icon-close"></Icon>
          </div>
          <div className="icon-demo-name">close</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon-delete-btn')}>
          <div className="icon-demo-icon">
            <Icon name="icon-delete-btn"></Icon>
          </div>
          <div className="icon-demo-name">delete-btn</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_folder')}>
          <div className="icon-demo-icon">
            <Icon name="icon_folder"></Icon>
          </div>
          <div className="icon-demo-name">folder</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_home')}>
          <div className="icon-demo-icon">
            <Icon name="icon_home"></Icon>
          </div>
          <div className="icon-demo-name">home</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_delete')}>
          <div className="icon-demo-icon">
            <Icon name="icon_delete"></Icon>
          </div>
          <div className="icon-demo-name">delete</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_search')}>
          <div className="icon-demo-icon">
            <Icon name="icon_search"></Icon>
          </div>
          <div className="icon-demo-name">search</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_loading')}>
          <div className="icon-demo-icon">
            <Icon name="icon_loading"></Icon>
          </div>
          <div className="icon-demo-name">loading</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_vacation')}>
          <div className="icon-demo-icon">
            <Icon name="icon_vacation"></Icon>
          </div>
          <div className="icon-demo-name">vacation</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_alarm')}>
          <div className="icon-demo-icon">
            <Icon name="icon_alarm"></Icon>
          </div>
          <div className="icon-demo-name">alarm</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_document')}>
          <div className="icon-demo-icon">
            <Icon name="icon_document"></Icon>
          </div>
          <div className="icon-demo-name">document</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_list')}>
          <div className="icon-demo-icon">
            <Icon name="icon_list"></Icon>
          </div>
          <div className="icon-demo-name">list</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_group')}>
          <div className="icon-demo-icon">
            <Icon name="icon_group"></Icon>
          </div>
          <div className="icon-demo-name">group</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_copy')}>
          <div className="icon-demo-icon">
            <Icon name="icon_copy"></Icon>
          </div>
          <div className="icon-demo-name">copy</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_mail_fail')}>
          <div className="icon-demo-icon">
            <Icon name="icon_mail_fail"></Icon>
          </div>
          <div className="icon-demo-name">mail_fail</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_mail_sent')}>
          <div className="icon-demo-icon">
            <Icon name="icon_mail_sent"></Icon>
          </div>
          <div className="icon-demo-name">mail_sent</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_mail_sent1')}>
          <div className="icon-demo-icon">
            <Icon name="icon_mail_sent1"></Icon>
          </div>
          <div className="icon-demo-name">mail_sent1</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_edit')}>
          <div className="icon-demo-icon">
            <Icon name="icon_edit"></Icon>
          </div>
          <div className="icon-demo-name">edit</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_dpm')}>
          <div className="icon-demo-icon">
            <Icon name="icon_dpm"></Icon>
          </div>
          <div className="icon-demo-name">dpm</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_mail_receive')}>
          <div className="icon-demo-icon">
            <Icon name="icon_mail_receive"></Icon>
          </div>
          <div className="icon-demo-name">mail_receive</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_mail_unread')}>
          <div className="icon-demo-icon">
            <Icon name="icon_mail_unread"></Icon>
          </div>
          <div className="icon-demo-name">mail_unread</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_meeting')}>
          <div className="icon-demo-icon">
            <Icon name="icon_meeting"></Icon>
          </div>
          <div className="icon-demo-name">meeting</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_meeting_manage')}>
          <div className="icon-demo-icon">
            <Icon name="icon_meeting_manage"></Icon>
          </div>
          <div className="icon-demo-name">meeting_manage</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_mail_success')}>
          <div className="icon-demo-icon">
            <Icon name="icon_mail_success"></Icon>
          </div>
          <div className="icon-demo-name">mail_success</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_message1')}>
          <div className="icon-demo-icon">
            <Icon name="icon_message1"></Icon>
          </div>
          <div className="icon-demo-name">message1</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_more')}>
          <div className="icon-demo-icon">
            <Icon name="icon_more"></Icon>
          </div>
          <div className="icon-demo-name">more</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_message')}>
          <div className="icon-demo-icon">
            <Icon name="icon_message"></Icon>
          </div>
          <div className="icon-demo-name">message</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_meeting2')}>
          <div className="icon-demo-icon">
            <Icon name="icon_meeting2"></Icon>
          </div>
          <div className="icon-demo-name">meeting2</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_time')}>
          <div className="icon-demo-icon">
            <Icon name="icon_time"></Icon>
          </div>
          <div className="icon-demo-name">time</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_more1')}>
          <div className="icon-demo-icon">
            <Icon name="icon_more1"></Icon>
          </div>
          <div className="icon-demo-name">more1</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_tel')}>
          <div className="icon-demo-icon">
            <Icon name="icon_tel"></Icon>
          </div>
          <div className="icon-demo-name">tel</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_share')}>
          <div className="icon-demo-icon">
            <Icon name="icon_share"></Icon>
          </div>
          <div className="icon-demo-name">share</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_tips')}>
          <div className="icon-demo-icon">
            <Icon name="icon_tips"></Icon>
          </div>
          <div className="icon-demo-name">tips</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_unit')}>
          <div className="icon-demo-icon">
            <Icon name="icon_unit"></Icon>
          </div>
          <div className="icon-demo-name">unit</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_mail_draft')}>
          <div className="icon-demo-icon">
            <Icon name="icon_mail_draft"></Icon>
          </div>
          <div className="icon-demo-name">mail_draft</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_mail_receive1')}>
          <div className="icon-demo-icon">
            <Icon name="icon_mail_receive1"></Icon>
          </div>
          <div className="icon-demo-name">mail_receive1</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_mail_read')}>
          <div className="icon-demo-icon">
            <Icon name="icon_mail_read"></Icon>
          </div>
          <div className="icon-demo-name">mail_read</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_lock')}>
          <div className="icon-demo-icon">
            <Icon name="icon_lock"></Icon>
          </div>
          <div className="icon-demo-name">lock</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_download')}>
          <div className="icon-demo-icon">
            <Icon name="icon_download"></Icon>
          </div>
          <div className="icon-demo-name">download</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_document1')}>
          <div className="icon-demo-icon">
            <Icon name="icon_document1"></Icon>
          </div>
          <div className="icon-demo-name">document1</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_unlock')}>
          <div className="icon-demo-icon">
            <Icon name="icon_unlock"></Icon>
          </div>
          <div className="icon-demo-name">unlock</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_collect')}>
          <div className="icon-demo-icon">
            <Icon name="icon_collect"></Icon>
          </div>
          <div className="icon-demo-name">collect</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_upload')}>
          <div className="icon-demo-icon">
            <Icon name="icon_upload"></Icon>
          </div>
          <div className="icon-demo-name">upload</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_img')}>
          <div className="icon-demo-icon">
            <Icon name="icon_img"></Icon>
          </div>
          <div className="icon-demo-name">img</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_cloud')}>
          <div className="icon-demo-icon">
            <Icon name="icon_cloud"></Icon>
          </div>
          <div className="icon-demo-name">cloud</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_cloud2')}>
          <div className="icon-demo-icon">
            <Icon name="icon_cloud2"></Icon>
          </div>
          <div className="icon-demo-name">cloud2</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_collect2')}>
          <div className="icon-demo-icon">
            <Icon name="icon_collect2"></Icon>
          </div>
          <div className="icon-demo-name">collect2</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_meeting_protect')}>
          <div className="icon-demo-icon">
            <Icon name="icon_meeting_protect"></Icon>
          </div>
          <div className="icon-demo-name">meeting_protect</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_collect1')}>
          <div className="icon-demo-icon">
            <Icon name="icon_collect1"></Icon>
          </div>
          <div className="icon-demo-name">collect1</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_f5')}>
          <div className="icon-demo-icon">
            <Icon name="icon_f5"></Icon>
          </div>
          <div className="icon-demo-name">f5</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_mails')}>
          <div className="icon-demo-icon">
            <Icon name="icon_mails"></Icon>
          </div>
          <div className="icon-demo-name">mails</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_save')}>
          <div className="icon-demo-icon">
            <Icon name="icon_save"></Icon>
          </div>
          <div className="icon-demo-name">save</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_set')}>
          <div className="icon-demo-icon">
            <Icon name="icon_set"></Icon>
          </div>
          <div className="icon-demo-name">set</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_set1')}>
          <div className="icon-demo-icon">
            <Icon name="icon_set1"></Icon>
          </div>
          <div className="icon-demo-name">set1</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_notice')}>
          <div className="icon-demo-icon">
            <Icon name="icon_notice"></Icon>
          </div>
          <div className="icon-demo-name">notice</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_search1')}>
          <div className="icon-demo-icon">
            <Icon name="icon_search1"></Icon>
          </div>
          <div className="icon-demo-name">search1</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_form')}>
          <div className="icon-demo-icon">
            <Icon name="icon_form"></Icon>
          </div>
          <div className="icon-demo-name">form</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_clean')}>
          <div className="icon-demo-icon">
            <Icon name="icon_clean"></Icon>
          </div>
          <div className="icon-demo-name">clean</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_enlarge1')}>
          <div className="icon-demo-icon">
            <Icon name="icon_enlarge1"></Icon>
          </div>
          <div className="icon-demo-name">enlarge1</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_send')}>
          <div className="icon-demo-icon">
            <Icon name="icon_send"></Icon>
          </div>
          <div className="icon-demo-name">send</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_enclosure')}>
          <div className="icon-demo-icon">
            <Icon name="icon_enclosure"></Icon>
          </div>
          <div className="icon-demo-name">enclosure</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_add')}>
          <div className="icon-demo-icon">
            <Icon name="icon_add"></Icon>
          </div>
          <div className="icon-demo-name">add</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_work')}>
          <div className="icon-demo-icon">
            <Icon name="icon_work"></Icon>
          </div>
          <div className="icon-demo-name">work</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_bin')}>
          <div className="icon-demo-icon">
            <Icon name="icon_bin"></Icon>
          </div>
          <div className="icon-demo-name">bin</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_text')}>
          <div className="icon-demo-icon">
            <Icon name="icon_text"></Icon>
          </div>
          <div className="icon-demo-name">text</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_calendar')}>
          <div className="icon-demo-icon">
            <Icon name="icon_calendar"></Icon>
          </div>
          <div className="icon-demo-name">calendar</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_print')}>
          <div className="icon-demo-icon">
            <Icon name="icon_print"></Icon>
          </div>
          <div className="icon-demo-name">print</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_address')}>
          <div className="icon-demo-icon">
            <Icon name="icon_address"></Icon>
          </div>
          <div className="icon-demo-name">address</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_schedule')}>
          <div className="icon-demo-icon">
            <Icon name="icon_schedule"></Icon>
          </div>
          <div className="icon-demo-name">schedule</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_location')}>
          <div className="icon-demo-icon">
            <Icon name="icon_location"></Icon>
          </div>
          <div className="icon-demo-name">location</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_visible')}>
          <div className="icon-demo-icon">
            <Icon name="icon_visible"></Icon>
          </div>
          <div className="icon-demo-name">visible</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_Q')}>
          <div className="icon-demo-icon">
            <Icon name="icon_Q"></Icon>
          </div>
          <div className="icon-demo-name">Q</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_lengthways')}>
          <div className="icon-demo-icon">
            <Icon name="icon_lengthways"></Icon>
          </div>
          <div className="icon-demo-name">lengthways</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_play')}>
          <div className="icon-demo-icon">
            <Icon name="icon_play"></Icon>
          </div>
          <div className="icon-demo-name">play</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_home1')}>
          <div className="icon-demo-icon">
            <Icon name="icon_home1"></Icon>
          </div>
          <div className="icon-demo-name">home1</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_crosswise')}>
          <div className="icon-demo-icon">
            <Icon name="icon_crosswise"></Icon>
          </div>
          <div className="icon-demo-name">crosswise</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_video')}>
          <div className="icon-demo-icon">
            <Icon name="icon_video"></Icon>
          </div>
          <div className="icon-demo-name">video</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_zoomin')}>
          <div className="icon-demo-icon">
            <Icon name="icon_zoomin"></Icon>
          </div>
          <div className="icon-demo-name">zoomin</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_service')}>
          <div className="icon-demo-icon">
            <Icon name="icon_service"></Icon>
          </div>
          <div className="icon-demo-name">service</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_descend')}>
          <div className="icon-demo-icon">
            <Icon name="icon_descend"></Icon>
          </div>
          <div className="icon-demo-name">descend</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_ascend')}>
          <div className="icon-demo-icon">
            <Icon name="icon_ascend"></Icon>
          </div>
          <div className="icon-demo-name">ascend</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_zoomout')}>
          <div className="icon-demo-icon">
            <Icon name="icon_zoomout"></Icon>
          </div>
          <div className="icon-demo-name">zoomout</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_board')}>
          <div className="icon-demo-icon">
            <Icon name="icon_board"></Icon>
          </div>
          <div className="icon-demo-name">board</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_stamp')}>
          <div className="icon-demo-icon">
            <Icon name="icon_stamp"></Icon>
          </div>
          <div className="icon-demo-name">stamp</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_tag')}>
          <div className="icon-demo-icon">
            <Icon name="icon_tag"></Icon>
          </div>
          <div className="icon-demo-name">tag</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_narrow')}>
          <div className="icon-demo-icon">
            <Icon name="icon_narrow"></Icon>
          </div>
          <div className="icon-demo-name">narrow</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_market')}>
          <div className="icon-demo-icon">
            <Icon name="icon_market"></Icon>
          </div>
          <div className="icon-demo-name">market</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_box')}>
          <div className="icon-demo-icon">
            <Icon name="icon_box"></Icon>
          </div>
          <div className="icon-demo-name">box</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_texts')}>
          <div className="icon-demo-icon">
            <Icon name="icon_texts"></Icon>
          </div>
          <div className="icon-demo-name">texts</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_scan')}>
          <div className="icon-demo-icon">
            <Icon name="icon_scan"></Icon>
          </div>
          <div className="icon-demo-name">scan</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_screen')}>
          <div className="icon-demo-icon">
            <Icon name="icon_screen"></Icon>
          </div>
          <div className="icon-demo-name">screen</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_waiting')}>
          <div className="icon-demo-icon">
            <Icon name="icon_waiting"></Icon>
          </div>
          <div className="icon-demo-name">waiting</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_edit1')}>
          <div className="icon-demo-icon">
            <Icon name="icon_edit1"></Icon>
          </div>
          <div className="icon-demo-name">edit1</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_top')}>
          <div className="icon-demo-icon">
            <Icon name="icon_top"></Icon>
          </div>
          <div className="icon-demo-name">top</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_canceltopping')}>
          <div className="icon-demo-icon">
            <Icon name="icon_canceltopping"></Icon>
          </div>
          <div className="icon-demo-name">canceltopping</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_user')}>
          <div className="icon-demo-icon">
            <Icon name="icon_user"></Icon>
          </div>
          <div className="icon-demo-name">user</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_recall')}>
          <div className="icon-demo-icon">
            <Icon name="icon_recall"></Icon>
          </div>
          <div className="icon-demo-name">recall</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_more2')}>
          <div className="icon-demo-icon">
            <Icon name="icon_more2"></Icon>
          </div>
          <div className="icon-demo-name">more2</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_export')}>
          <div className="icon-demo-icon">
            <Icon name="icon_export"></Icon>
          </div>
          <div className="icon-demo-name">export</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_folder1')}>
          <div className="icon-demo-icon">
            <Icon name="icon_folder1"></Icon>
          </div>
          <div className="icon-demo-name">folder1</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_folder_open')}>
          <div className="icon-demo-icon">
            <Icon name="icon_folder_open"></Icon>
          </div>
          <div className="icon-demo-name">folder_open</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_download1')}>
          <div className="icon-demo-icon">
            <Icon name="icon_download1"></Icon>
          </div>
          <div className="icon-demo-name">download1</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_upload1')}>
          <div className="icon-demo-icon">
            <Icon name="icon_upload1"></Icon>
          </div>
          <div className="icon-demo-name">upload1</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_next1')}>
          <div className="icon-demo-icon">
            <Icon name="icon_next1"></Icon>
          </div>
          <div className="icon-demo-name">next1</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_previous1')}>
          <div className="icon-demo-icon">
            <Icon name="icon_previous1"></Icon>
          </div>
          <div className="icon-demo-name">previous1</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_double_screen')}>
          <div className="icon-demo-icon">
            <Icon name="icon_double_screen"></Icon>
          </div>
          <div className="icon-demo-name">double_screen</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_save_as')}>
          <div className="icon-demo-icon">
            <Icon name="icon_save_as"></Icon>
          </div>
          <div className="icon-demo-name">save_as</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_import')}>
          <div className="icon-demo-icon">
            <Icon name="icon_import"></Icon>
          </div>
          <div className="icon-demo-name">import</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_writing')}>
          <div className="icon-demo-icon">
            <Icon name="icon_writing"></Icon>
          </div>
          <div className="icon-demo-name">writing</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_output')}>
          <div className="icon-demo-icon">
            <Icon name="icon_output"></Icon>
          </div>
          <div className="icon-demo-name">output</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_version_saved')}>
          <div className="icon-demo-icon">
            <Icon name="icon_version_saved"></Icon>
          </div>
          <div className="icon-demo-name">version_saved</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_output_canceled')}>
          <div className="icon-demo-icon">
            <Icon name="icon_output_canceled"></Icon>
          </div>
          <div className="icon-demo-name">output_canceled</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_record')}>
          <div className="icon-demo-icon">
            <Icon name="icon_record"></Icon>
          </div>
          <div className="icon-demo-name">record</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_revision_accepted')}>
          <div className="icon-demo-icon">
            <Icon name="icon_revision_accepted"></Icon>
          </div>
          <div className="icon-demo-name">revision_accepted</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_red')}>
          <div className="icon-demo-icon">
            <Icon name="icon_red"></Icon>
          </div>
          <div className="icon-demo-name">red</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_revision_unaccepted')}>
          <div className="icon-demo-icon">
            <Icon name="icon_revision_unaccepted"></Icon>
          </div>
          <div className="icon-demo-name">revision_unaccepted</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon-arrow-left')}>
          <div className="icon-demo-icon">
            <Icon name="icon-arrow-left"></Icon>
          </div>
          <div className="icon-demo-name">arrow-left</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon-arrow-down')}>
          <div className="icon-demo-icon">
            <Icon name="icon-arrow-down"></Icon>
          </div>
          <div className="icon-demo-name">arrow-down</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon-arrow-up')}>
          <div className="icon-demo-icon">
            <Icon name="icon-arrow-up"></Icon>
          </div>
          <div className="icon-demo-name">arrow-up</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon-arrow-right')}>
          <div className="icon-demo-icon">
            <Icon name="icon-arrow-right"></Icon>
          </div>
          <div className="icon-demo-name">arrow-right</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_more3')}>
          <div className="icon-demo-icon">
            <Icon name="icon_more3"></Icon>
          </div>
          <div className="icon-demo-name">more3</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_edit_reject')}>
          <div className="icon-demo-icon">
            <Icon name="icon_edit_reject"></Icon>
          </div>
          <div className="icon-demo-name">edit_reject</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_videochat1')}>
          <div className="icon-demo-icon">
            <Icon name="icon_videochat1"></Icon>
          </div>
          <div className="icon-demo-name">videochat1</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_data3')}>
          <div className="icon-demo-icon">
            <Icon name="icon_data3"></Icon>
          </div>
          <div className="icon-demo-name">data3</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_text_message')}>
          <div className="icon-demo-icon">
            <Icon name="icon_text_message"></Icon>
          </div>
          <div className="icon-demo-name">text_message</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon-bedefeated')}>
          <div className="icon-demo-icon">
            <Icon name="icon-bedefeated"></Icon>
          </div>
          <div className="icon-demo-name">bedefeated</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon-success')}>
          <div className="icon-demo-icon">
            <Icon name="icon-success"></Icon>
          </div>
          <div className="icon-demo-name">success</div>
        </div>
        <div className="icon-demo-item" onClick={() => handleCopy('icon_files')}>
          <div className="icon-demo-icon">
            <Icon name="icon_files"></Icon>
          </div>
          <div className="icon-demo-name">files</div>
        </div>
      </div>
    </div>
  );
};

export default IconDemo;
```
