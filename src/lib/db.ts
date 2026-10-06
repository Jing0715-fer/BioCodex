import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// E44-fix: git 操作(rebase/checkout/reset)会重写 db 文件产生新 inode,
// dev server 长驻的旧 PrismaClient 会连着 (deleted) 旧 inode 读到陈旧数据
// (实测 API 返回 image:null 而 DB 直查有值)。模块重载时强制断开旧客户端
// 并重建,重新打开当前 inode 的 db 文件。
if (globalForPrisma.prisma) {
  void globalForPrisma.prisma.$disconnect().catch(() => {})
}
globalForPrisma.prisma = new PrismaClient({
  log: ['query'],
})

export const db = globalForPrisma.prisma