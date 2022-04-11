<script setup>
import { defineProps } from "vue"
const props = defineProps({
    minMax: String,
    modelValue: String,
    minValue: String,
    maxValue: String
})

const emit = defineEmits(['update:modelValue'])

const updateValue = (event) => {
    emit('update:modelValue', event.target.value)
}
</script>
<template>
    <label :for="`${props.minMax}Price`">
        {{ props.minMax }} Price
        <input
            type="range"
            :name="`${props.minMax}Price`"
            :value="modelValue"
            @input="updateValue"
            :min="props.minValue"
            :max="props.maxValue"
        />
        <p>{{ modelValue }}$</p>
    </label>
</template>
