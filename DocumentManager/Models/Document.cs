using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DocumentManager.Models
{
	[Table("Document")]
	public class Document
	{
		[Key]
		public int Id { get; set; }
		[Required]
		public string? Name { get; set; }
		[Required]
		public string? Path { get; set; }
		[Required]
		public string? Category { get; set; }
	}

}
