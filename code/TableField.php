<?php

/**
 * Class TableField
 */
class TableField extends TextField
{
    /**
     * TableField constructor.
     * @param string $name
     * @param null $title
     * @param string $value
     * @param null $maxLength
     * @param null $form
     */
    public function __construct($name, $title = null, $value = '', $maxLength = null, $form = null)
    {
        parent::__construct($name, $title, $value, $maxLength, $form);

        $this->setTemplate('TableField');

        $this->setAttribute('class', 'text');
        $this->setAttribute('data-value', 'true');
        $this->setAttribute('type', 'hidden');
    }

    /**
     * @param array $properties
     * @return string
     */
    public function Field($properties = array())
    {
        Requirements::css(TABLE_FIELD_PLUGIN_PATH . '/css/table-field.css');
        Requirements::javascript(TABLE_FIELD_PLUGIN_PATH . '/js/table-field.js');
        return parent::Field($properties);
    }
}
