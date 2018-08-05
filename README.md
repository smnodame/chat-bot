## INPUT
{
  send_icon: xml,
  buttonMessage: string,
  messsage: string,
  input: [
    placeholder: string,
    type: ['number', 'text', 'email'],
    min: number|null,
    max: number|null
  ]
}

## AUTO COMPLETE
{
  send_icon: xml,
  placeholder: string,
  message: string,
  option: [
    label: string,
    value: string|number,
  ]
}

## CHECK BOX
{
  button_text: string,
  message: string
  option: [
    label: string,
    value: string|number,
    checked: boolean
  ]
}

## CANLENDAR
{
  button_text: string,
  message: string
}

## BUTTON LISTS
{
  layout: ['holizontal', 'vertical'],
  message: string,
  option: [
    label: string,
    value: string
  ]
}

## ADD ON
{
  title: string,
  item: [
    {
      image: xml,
      title: string,
      description: string,

      rate: float,
      custom_calculate_rate: function(round: number, number: number): number,
      unit: string,
      max: number,
      min: number,

      default_number: number,
      increase_number: number,

      botton_text: string,
      
      note_title: string,
      note_button_text: string,
      note_item: [
        {
          image: xml,
          description: string,
        }
      ]
    }
  ]
}

## MAP
{
  
}

## COVERAGE
{
  title: string,
  item: [
    {
      title: string,
      image: xml,
      description: string,

      rate: float,
      custom_calculate_rate: function(round: number, number: number): number,
      unit: string,
      max: number,
      min: number,

      default_number: number,
      increase_number: number,
    }
  ]
}

## ADD OTHERS
{
  title: string,
  item: [
    {
      checked: boolean,
      title: string,
      description: string,
      rate: float,
      unit: string,
      note: {
        title: string,
        description: string,
        item: [{
          placeholder: string,
          type: ['number', 'text', 'email'],
          min: number|null,
          max: number|null
        }],
        button_text: string
      }
    }
  ]
}

