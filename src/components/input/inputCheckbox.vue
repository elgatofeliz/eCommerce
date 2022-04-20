<script setup>
const props = defineProps({
    category: String,
    modelValue: Boolean,
    id: String
})

const emit = defineEmits(['update:modelValue'])

const updateValue = (event) => {
    emit('update:modelValue', event.target.checked)
}

</script>
<template>
    <label :for="`${category}`">
        {{ category }}
        <input
            type="checkbox"
            :id="id"
            :name="`${category}`"
            :isChecked="modelValue"
            @change="updateValue"
        />
    </label>
</template>