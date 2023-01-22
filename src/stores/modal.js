import { defineStore } from 'pinia'
import bus from "@/utils/bus";

export const useModalStore = defineStore('modal', {
    state: () => {
        return {
            modalData: {}
        }
    },

    actions: {
        M_modal(data) {
            this.$patch((state) => {
                state.modalData = data
            })
        },

        callModal(payload) {
            return new Promise((resolve, reject) => {
                this.M_modal(payload);
                bus.emit('openModal')
                resolve(null);
            })
        },

        close() {
            return new Promise((resolve, reject) => {
                this.$patch((state) => {
                    state.modalData = {}
                })
                bus.emit('closeModal')
                resolve(null);
            })
        }
    }
})
