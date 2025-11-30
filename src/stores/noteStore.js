import { defineStore } from 'pinia'

export const useNoteStore = defineStore("notes", {
    state: () => ({
        notes: [
            {
                id: 1,
                title: '完成作業',
                content: '完成歷史作業第11章',
                pinned: false
            },
            {
                id: 2,
                title: '買菜',
                content: '購買牛奶、雞蛋和麵包',
                pinned: false
            },
            {
                id: 3,
                title: '運動',
                content: '晚上慢跑30分鐘',
                pinned: true
            },
            {
                id: 4,
                title: '閱讀',
                content: '閱讀Vue 3官方文件第5章',
                pinned: false
            },
            {
                id: 5,
                title: '聯絡朋友',
                content: '打電話給小明約週末聚餐',
                pinned: false
            },
            {
                id: 6,
                title: '整理房間',
                content: '清理書桌和衣櫃',
                pinned: true
            }
        ],
        searchResults: []
    }),
    getters: {
        // 查詢依賴聯繫
        pinnedNotes(state) {
            return state.notes.filter(note => note.pinned);
        },
        unPinnedNotes(state) {
            return state.notes.filter(note => !note.pinned);
        }
    },
    actions: {
        // 查詢、刪除、寫入
        markedPinned(id) {
            const note = this.notes.find(note => note.id === id);
            note.pinned = !note.pinned;
        },
        addNote(newTitle, newContent) {
            if (!title) return false //等同 if (title === null)
            const last_id = this.notes.length + 1;
            this.notes.push({
                id: last_id,
                title: newTitle,
                content: newContent,
                pinned: false
            })
            return true;
        },
        editNote(id, title, content) {
            const note = this.notes.find(note => note.id === id); //note是陣列中符合查找id值的那個物件
            if (note !== -1) {
                note.title = title;
                note.content = content;
                return true;
            }
        },
        deleteNote(id) {
            const index = this.notes.findIndex(note => note.id === id);
            this.notes.splice(index, 1);
        },
        searchNotes(keyword) {
            this.searchResults = this.notes.filter(note => note.title.includes(keyword) || note.content.includes(keyword));
        }
    }
})
