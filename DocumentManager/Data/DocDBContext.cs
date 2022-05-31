using Microsoft.EntityFrameworkCore;
using DocumentManager.Models;

namespace DocumentManager.Data
{
    public class DocDBContext : DbContext
    {
        //public DbSet<Doc> Docs { get; set; }

        public DocDBContext(DbContextOptions<DocDBContext> options)
            : base(options)
        {
        }

        public DbSet<Document> Documents { get; set; }

        //protected override void OnConfiguring(DbContextOptionsBuilder options)
        //  => options.UseSqlServer($"DataSource=localhost;InitialCatalog=AllDocs;integratedsecurity=true");

    }
}
