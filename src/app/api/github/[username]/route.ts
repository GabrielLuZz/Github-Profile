import { NextRequest, NextResponse } from "next/server";
import { repositoryGateway, userGateway } from "@/services/api";
import { ITEMS_PER_PAGE } from "@/lib/utils";

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    const { username } = params;
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const type = searchParams.get("type") || "repositories";

    if (!username) {
      return NextResponse.json(
        { error: "Username é obrigatório" },
        { status: 400 }
      );
    }

    // Buscar dados do usuário
    const user = await userGateway.getUser(username);

    let repositories = [];
    
    // Buscar repositórios baseado no tipo
    if (type === "starred") {
      repositories = await repositoryGateway.getUserStarredRepositories(
        username,
        page,
        ITEMS_PER_PAGE
      );
    } else {
      repositories = await repositoryGateway.getUserRepositories(
        username,
        page,
        ITEMS_PER_PAGE
      );
    }

    return NextResponse.json({
      user,
      repositories,
      page,
      type,
    });
  } catch (error: any) {
    console.error("Erro na API GitHub:", error);
    
    return NextResponse.json(
      { 
        error: error.message || "Erro interno do servidor",
        status: error.status || 500 
      },
      { status: error.status || 500 }
    );
  }
} 